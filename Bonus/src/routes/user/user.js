const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
} = require("./user.query");

router.get("/user", auth, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    res.json({
      id: user.id,
      email: user.email,
      password: "hashed password",
      created_at: user.created_at,
      firstname: user.firstname,
      name: user.name,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Internal server error" });
  }
});

router.get("/users/:param", auth, async (req, res) => {
  const param = req.params.param;

  try {
    let user;
    if (param.includes("@")) {
      user = await getUserByEmail(param);
    } else {
      user = await getUserById(parseInt(param));
    }

    res.json({
      id: user.id,
      email: user.email,
      password: "hashed password",
      created_at: user.created_at,
      firstname: user.firstname,
      name: user.name,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Internal server error" });
  }
});

router.put("/users/:id", auth, async (req, res) => {
  try {
    const updatedUser = await updateUser(parseInt(req.params.id), req.body);
    res.json(updatedUser);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Internal server error" });
  }
});

router.delete("/users/:id", auth, async (req, res) => {
  try {
    const result = await deleteUser(parseInt(req.params.id));
    res.json({ msg: `Successfully deleted record number : ${req.params.id}` });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ msg: err.msg || "Internal server error" });
  }
});

module.exports = router;
