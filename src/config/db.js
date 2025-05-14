const mysql = require("mysql2");
require("dotenv").config();


function create_logs(callback, connection) {
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
        console.log("PASS TABLE LOG");
        callback(null, connection);
    });
}

function create_todo(callback, connection) {
    const createTodoTable = `
        CREATE TABLE IF NOT EXISTS todo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        created_at DATETIME NOT NULL,
        due_time DATETIME NOT NULL, 
        status enum('not started', 'to do', 'in progress', 'done') NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES logs(id)
        )`;
    connection.query(createTodoTable, (err) => {
    if (err)
        return callback(err);
    console.log("PASS TABLE TO DO0");
    callback(null, connection);
    });
}

function initDatabase(callback) {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
    if (err){
        console.log("create_error\n");
        return callback(err);
    }
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
        if (err){
            return callback(err);
        }
        create_logs(callback, connection);
        create_todo(callback, connection);
    });
  });
}

module.exports = {
    initDatabase: initDatabase,
    connection: mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }),
};
