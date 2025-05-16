require("dotenv").config();
const mysql = require("mysql2");
const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const token_const = require("../../config/const_token");
const { error } = require("console");

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  

function view_todo(id, res) {
    const query = `SELECT * FROM todo
            WHERE id = ${id}`;
    connect.query(query, function(err, result) {
        if (err) {
            console.error(`Error todo with id = ${id}:`, err);
            return err;
        }
        if (result.length === 0) {
            return res.status(404).send('Todo not found');
        }
        console.log(result);
        res.render('todo', { todo : result[0] });
    });
}

function view_all_todo(res) {
    if (!token_const || !token_const.token)
        return res.redirect("/login");
    console.log("toke = ", token_const.tokenValue);
    const query = `SELECT * FROM todo
            WHERE user_id = ${token_const.tokenValue.id}`;
    connect.query(query, function(err, result) {
        if (err) {
            console.error(`Error showing todo table:`, err);
            return err;
        }
        res.render('todo_list', {todo : result});
    });
}

exports.view_todo_id = view_todo;
exports.view_all_todo = view_all_todo;