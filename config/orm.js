var connection = require("../config/connection.js");

// helper function to create array of question mark strings to be used in mysql queries
function printQuestionMarks(number) {
    var array = [];
    for (var i = 0; i < number; i++){
        array.push("?");
    }
    return array.toString();
}

// helper function that converts object key/value pairs to sql syntax
function objectToSql(object){
    var array = [];
    for (var key in object){
        var value = object[key];
        if (Object.hasOwnProperty.call(object, key)){
            if (typeof value === "string" && value.indexOf(" ") >= 0){
                value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
    }
    return array.toString();
}

// object for all sql statement functions
var orm = {
    // queries all rows in sql table
    selectAll: function(table, callback){
        var query = "select * from " + table + ";";
        connection.query(query, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
    // performs insert mysql query
    insertOne: function(table, columns, values, callback){
        var query = "insert into " + table + " (" + columns.toString() + ") values (" + printQuestionMarks(values.length) + ") ";
        console.log(query);
        connection.query(query, values, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
    // performs update mysql query
    updateOne: function(table, objectColumnValues, condition, callback){
        var query = "update " + table + " set " + objectToSql(objectColumnValues) + " where " + condition;
        console.log(query);
        connection.query(query, function(err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    }
};

module.exports = orm;