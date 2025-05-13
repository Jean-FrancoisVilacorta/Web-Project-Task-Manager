const mysql = require("mysql2");
require("dotenv").config();

function initDatabase(callback) {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
    if (err)
        return callback(err);
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
        if (err)
            return callback(err);
        const createLogsTable = `
            CREATE TABLE IF NOT EXISTS logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                first_name VARCHAR(100) NOT NULL,
                day_time VARCHAR(100) NOT NULL
            )`;
        connection.query(createLogsTable, (err) => {
            if (err)
                return callback(err);
            console.log("PASS TABLE");
            callback(null, connection);
        });
    });
  });
}

module.exports = initDatabase;
