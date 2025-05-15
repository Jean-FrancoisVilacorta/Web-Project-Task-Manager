const { getConnection } = require('../../config/const_db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const connection = getConnection();

    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send("Missing fields");
    }

    const checkQuery = 'SELECT * FROM logs WHERE email = ?';
    connection.query(checkQuery, [email], async (err, results) => {
        if (err) {
            console.error("[ERROR]: Connecting with the data Base", err);
        return res.status(500).json({ msg: "Database error" });
        }
        if (results.length > 0) {
            return res.status(400).json({ msg: "Account already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const day_time = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const insertQuery = `
            INSERT INTO logs (first_name, last_name, password, email, day_time)
            VALUES (?, ?, ?, ?, ?)
        `;
        connection.query(insertQuery, [first_name, last_name, hashedPassword, email, day_time], (err, result) => {
            if (err) {
                console.error("[ERROR]: Connecting with the data Base", err);
                return res.status(500).json({ msg: "[ERROR]: Connecting with the data Base" });
            }
            const token = "Token";
            res.status(201).json({ token });
        });
    });
};