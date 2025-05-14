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

app.use(express.urlencoded({ extended: true }));

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

    app.listen(port, () => {
        console.log(`server: http://localhost:${port}`);
    });
});
