var orm = require("../config/orm.js");

// burger model is an abstraction of the data ORM and is used by the burger controller file
var burger = {
    selectAll: function(callback){
        orm.selectAll("burgers", (res) => {
            callback(res);
        });
    },
    insertOne: function(columns, values, callback){
        orm.insertOne("burgers", columns, values, (res) => {
            callback(res);
        });
    },
    updateOne: function(objectColumnValues, condition, callback){
        orm.updateOne("burgers", objectColumnValues, condition, (res) => {
            callback(res);
        });
    }
};

// export database functions for the controller file
module.exports = burger;