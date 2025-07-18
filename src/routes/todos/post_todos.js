require("dotenv").config();
const mysql = require("mysql2");
const express = require('express');
const token_const = require("../../config/const_token");

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });


function todo_create(req, res) {
    const {title, description, due_time, status, user_id} = req.body;
    if (!title || !description || !due_time || !status || !user_id)
        return res.status(400).send("Missing fields");

    const create_todo = `INSERT INTO todo (title, description, created_at, due_time, status, user_id)
                        VALUES (\'${title}\',
                                \'${description}\',
                                NOW(),
                                \'${due_time}\',
                                \'${status}\',
                                (SELECT id FROM user WHERE id = ${user_id}))`;

    connect.query(create_todo, (err) => {
        if (err){
            console.log("Creation failed", err);
            return res.status(500).json({msg : "Error when creating"})
        }
        const select = `SELECT * FROM todo
                WHERE title = \'${title}\'
                AND description = \'${description}\'
                AND due_time = \'${due_time}\'`; 
        connect.query(select, (err, result) => {
            if (err){
                console.log("Creation failed", err);
                return res.status(500).json({msg : "Error when creating"})
            }
            res.send(result[0]);
        });
    })
}

function todo_update(id, req, res) {
    const {title, description, due_time, status} = req.body;
    if (!title || !description || !due_time || !status)
        return res.status(400).send("Missing fields");
    const update = `UPDATE todo
        SET
        title = \'${title}\',
        description = \'${description}\',
        due_time = \'${due_time}\',
        status = \'${status}\'
        WHERE id = ${id}`;
    connect.query(update, (err) => {
        if (err){
            console.log("Update database Error : ", err);
            return res.status(500).json({msg : "Error Update"});
        }
        connect.query(`SELECT * FROM todo WHERE id = ${id}`, (err, result) => {
            if (err){
                console.log("Update database Error : ", err);
                return res.status(500).json({msg : "Error Update"});
            }
            res.send(result);
        });
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
        res.json({ msg : `Successfully deleted record number : ${id}`});
    });
}

exports.todo_update = todo_update;
exports.todo_delete = todo_delete;
exports.todo_create = todo_create;