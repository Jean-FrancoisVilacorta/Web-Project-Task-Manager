require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require('path');

const { initDatabase } = require('./config/db.js');

const register = require("./routes/register/register.js");
const post_register = require("./routes/register/post_register.js");

const login = require("./routes/login/login.js");
const post_login = require("./routes/login/post_login.js");
const auth = require("./middleware/auth.js");
const userRoutes = require("./routes/user/user.js");

const view_todo = require("./routes/todos/todo.js");
const post_todo = require("./routes/todos/post_todos.js");

const view_all_todo = view_todo.view_all_todo;
const view_todo_id  = view_todo.view_todo_id;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./views"));

initDatabase((err, db) => {
    if (err) {
        console.error("OH NO! CALL THE POLLICE, THE CODE IS GOINNG TO EXPLOTE!\n", err);
        process.exit(84);
    }

    app.get("/", (req, res) => {  
        res.send("Epytodo");
    });

    app.get('/register', (req, res) => {
        register(req, res);
    });

    app.post('/register', (req, res) => {
        post_register(req, res)
    });

    app.get('/login', (req, res) => {
        login(req, res);
    });

    app.post('/login', (req, res) => {
        post_login(req, res);
    });


    app.get('/todos', (req, res) => {
        view_all_todo(res);
    });

    app.post('/todos', (req, res) => {
        post_todo.todo_create(req, res);
    });

    app.get('/todos/:id', (req, res) => {
        let id = req.params.id;
        view_todo_id(id, res);
    });

    app.put('/todos/:id', (req, res) => {
        const id = req.params.id;
        console.log("Update");
        post_todo.todo_update(id, req, res);
    })

    app.post('/todos/:id', (req, res) => {
        const id = req.params.id;
        post_todo.todo_delete(id, res);
    })

    app.use("/", userRoutes);

    app.listen(port, () => {
        console.log(`server: http://localhost:${port}`);
    });
});
