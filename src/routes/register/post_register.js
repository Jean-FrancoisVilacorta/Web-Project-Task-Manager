const { getConnection } = require("../../config/const_db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const connection = getConnection();

  const { firstname, name, email, password } = req.body;

  if (!firstname || !name || !email || !password) {
    return res.status(400).send("Missing fields");
  }

  const checkQuery = "SELECT * FROM user WHERE email = ?";
  connection.query(checkQuery, [email], async (err, results) => {
    if (err) {
      console.error("[ERROR]: Connecting with the data Base", err);
      return res.status(500).json({ msg: "Database error" });
    }
    if (results.length > 0) {
      return res.status(400).json({ msg: "Account already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

    const insertQuery = `
            INSERT INTO user (firstname, name, password, email, created_at)
            VALUES (?, ?, ?, ?, ?)
        `;
    connection.query(
      insertQuery,
      [firstname, name, hashedPassword, email, created_at],
      (err, result) => {
        if (err) {
          console.error("[ERROR]: Connecting with the data Base", err);
          return res
            .status(500)
            .json({ msg: "[ERROR]: Connecting with the data Base" });
        }
        const token = "Token";
        res.status(201).json({ token });
      }
    );
  });
};
