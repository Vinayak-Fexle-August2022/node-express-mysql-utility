import mysql from "mysql";

export let connection;

export function connectDatabase(){
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "@Vasu001",
        database: 'employees'
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Database Connected!");
    });
}
