const path = require('path');
const express = require("express");
const app = express();

const login = (req, res) => {
    app.use(express.static(path.join(__dirname, '../../views/STYLE/style.css')));
    res.sendFile(path.join(__dirname, '../../views/login.html'));
};

module.exports = login;
