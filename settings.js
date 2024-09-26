const db = require('mysql2-promise')();
 

db.configure({
    host: "localhost",
    user: "root",
    password: "@Vasu001",
    database: 'employees'
});


module.exports = db;