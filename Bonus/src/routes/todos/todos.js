const mysql = require("mysql2");
require("dotenv").config();

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });


function view_todo(id, res) {
    const query = 'SELECT * FROM todo WHERE id = ?';
    connect.query(query, [id], function(err, result) {
        if (err) {
            console.error(`Error fetching todo with id = ${id}:`, err);
            return err;
        }

        if (result.length === 0) {
            return res.status(404).send('Todo not found');
        }
        console.log(result);
        res.send(result);
    });
}

function view_all_todo(res) {
    const query = 'SELECT * FROM todo';
    connect.query(query, function(err, result) {
        if (err) {
            console.error(`Error showing todo table:`, err);
            return err;
        }

        if (result.length === 0) {
            return res.status(404).send('Todo not found');
        }
        console.log(result);
        res.send(result);
    });
}

exports.view_todo_id = view_todo;
exports.view_all_todo = view_all_todo;