const { connection: db } = require("../../config/db");
const bcrypt = require("bcryptjs");

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user WHERE email = ?";

    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return reject({ status: 500, msg: "Internal server error" });
      }

      if (results.length === 0) {
        return reject({ status: 404, msg: "User not found" });
      }

      resolve(results[0]);
    });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return reject({ status: 500, msg: "Internal server error" });
      }

      if (results.length === 0) {
        return reject({ status: 404, msg: "User not found" });
      }

      resolve(results[0]);
    });
  });
}

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM user WHERE id = ?";

    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return reject({ status: 500, msg: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return reject({ status: 404, msg: "User not found" });
      }

      resolve({ status: 200, msg: "User deleted successfully" });
    });
  });
}

function updateUser(userId, updateData) {
  return new Promise(async (resolve, reject) => {
    try {
      const checkQuery = "SELECT * FROM user WHERE id = ?";

      db.query(checkQuery, [userId], async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return reject({ status: 500, msg: "Internal server error" });
        }

        if (results.length === 0) {
          return reject({ status: 404, msg: "Not found" });
        }

        const user = results[0];
        const updates = {};
        const updateFields = [];
        const updateValues = [];

        if (updateData.email !== undefined) {
          if (updateData.email !== user.email) {
            const emailCheckQuery =
              "SELECT id FROM user WHERE email = ? AND id != ?";
            const [emailResults] = await db
              .promise()
              .query(emailCheckQuery, [updateData.email, userId]);

            if (emailResults.length > 0) {
              return reject({ status: 409, msg: "Email already in use" });
            }

            updateFields.push("email = ?");
            updateValues.push(updateData.email);
            updates.email = updateData.email;
          }
        }

        if (updateData.name !== undefined) {
          updateFields.push("name = ?");
          updateValues.push(updateData.name);
          updates.name = updateData.name;
        }

        if (updateData.firstname !== undefined) {
          updateFields.push("firstname = ?");
          updateValues.push(updateData.firstname);
          updates.firstname = updateData.firstname;
        }

        if (updateData.password) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(updateData.password, salt);

            updateFields.push("password = ?");
            updateValues.push(hashedPassword);
            updates.password = "hashed password";
          } catch (err) {
            console.error("Bcrypt error:", err);
            return reject({ status: 500, msg: "Internal server error" });
          }
        }

        if (updateFields.length === 0) {
          const userResponse = {
            id: user.id,
            email: user.email,
            password: "hashed password",
            created_at: user.created_at,
            firstname: user.firstname,
            name: user.name,
          };
          return resolve(userResponse);
        }

        const updateQuery = `UPDATE user SET ${updateFields.join(
          ", "
        )} WHERE id = ?`;
        updateValues.push(userId);

        db.query(updateQuery, updateValues, (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return reject({ status: 500, msg: "Internal server error" });
          }

          if (result.affectedRows === 0) {
            return reject({ status: 404, msg: "Not found" });
          }

          db.query(
            "SELECT * FROM user WHERE id = ?",
            [userId],
            (err, results) => {
              if (err) {
                console.error("Database error:", err);
                return reject({ status: 500, msg: "Internal server error" });
              }

              const updatedUser = results[0];

              const userResponse = {
                id: updatedUser.id,
                email: updatedUser.email,
                password: "hashed password",
                created_at: updatedUser.created_at,
                firstname: updatedUser.firstname,
                name: updatedUser.name,
              };

              resolve(userResponse);
            }
          );
        });
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      reject({ status: 500, msg: "Internal server error" });
    }
  });
}

module.exports = {
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
};
