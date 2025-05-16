const mysql = require("mysql2");
require("dotenv").config();

const { setConnection } = require("./const_db.js");

function create_user(callback, connection) {
const createUserTable = `
        CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        firstname VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`;
connection.query(createUserTable, (err) => {
    if (err) return callback(err);
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
        FOREIGN KEY (user_id) REFERENCES user(id)
        )`;
connection.query(createTodoTable, (err) => {
    if (err) return callback(err);
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

connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``,
    (err) => {
    if (err) {
        console.log("[ERROR] - Creating the DataBase");
        return callback(err);
    }
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
        if (err) {
        console.log("[ERROR] - Changing the User");
        return callback(err);
        }
        create_user((err) => {
        if (err) {
            console.log("[ERROR] - Creating the user");
            return callback(err);
        }
        create_todo((err) => {
            if (err) return callback(err);
            setConnection(connection);
            callback(null, connection);
        }, connection);
        }, connection);
    });
    }
);
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
