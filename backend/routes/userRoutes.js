const express = require("express");
const router = express.Router();
const { GetUsers, UpdateUser } = require("../controllers/userController");

router.get("/users", GetUsers);
router.post("/updateUser", UpdateUser);

module.exports = router;
