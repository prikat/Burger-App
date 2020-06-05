var mysql = require("mysql");

// establish connection to mysql database
var connection = mysql.createConnection(process.env.JAWSDB_URL || { 
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burgers_db"
});

// send error if error connecting, otherwise console log thread id
connection.connect(err => {
    if (err) {
        console.log("Error connecting " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;