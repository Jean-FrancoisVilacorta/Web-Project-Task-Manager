const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connection: db } = require("../../config/db");

const post_login = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Bad parameter" });
  }

  const query = "SELECT * FROM user WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ msg: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).json({ msg: "Internal server error" });
      }

      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid Credentials" });
      }

      jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            console.error("JWT error:", err);
            return res.status(500).json({ msg: "Internal server error" });
          }
          res.status(200).json({ token });
        }
      );
    });
  });
};

module.exports = post_login;
