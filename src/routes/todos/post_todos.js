require("dotenv").config();
const mysql = require("mysql2");
const express = require('express');
const app = express();
const path = require('path');
const { connected } = require("process");

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });


function todo_create(req, res) {
    const {new_title, new_desc, new_time} = req.body;
    if (!new_time || !new_desc || !new_time)
        return res.status(400).send("Missing fields");

    const create_todo = `INSERT INTO todo (title, description, created_at, due_time, user_id)
                        VALUES (\'${new_title}\',
                                \'${new_desc}\',
                                NOW(),
                                \'${new_time}\',
                                (SELECT id FROM logs WHERE id = 1))`;

    connect.query(create_todo, (err) => {
        if (err){
            console.log("Creation failed", err);
            return res.status(500).json({msg : "Error when creating"})
        }
    })
    res.redirect('/todos')
}

function todo_update(id, req, res) {
    const {todo_title, todo_desc, due_time} = req.body;
    if (!todo_title || !todo_desc || !due_time)
        return res.status(400).send("Missing fields");
    const update = `UPDATE todo
        SET
        title = \'${todo_title}\',
        description = \'${todo_desc}\',
        due_time = \'${due_time}\'
        WHERE id = ${id}`;
    connect.query(update, (err) => {
        if (err){
            console.log("Update database Error : ", err);
            return res.status(500).json({msg : "Error Update"});
        }
    });
}

function todo_delete(id, res) {
    const delete_todo = `DELETE FROM todo
                    WHERE id = ${id}`;

    connect.query(delete_todo, (err) => {
        if (err){
            console.log("Delete database Error : ", err);
            return res.status(500).json({msg : "Error Delete"});
        }
        res.redirect(`/todos`)
    });
}

exports.todo_update = todo_update;
exports.todo_delete = todo_delete;
exports.todo_create = todo_create;