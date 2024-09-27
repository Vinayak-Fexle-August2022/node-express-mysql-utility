const pool = require("mysql2/promise");

const pool_conn = pool.createPool({
    connectionLimit : 10,
    queueLimit: 100,
    host: "localhost",
    user: "root",
    password: "@Vasu001",
    database: "employees",
    port: 3306,
});

module.exports = pool_conn;