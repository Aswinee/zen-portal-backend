const express = require("express");
const router = express.Router();

const {
  readUser,
  addQuery,
  submitTask,
} = require("../controllers/user.controller");

router.get("/user/:id", readUser);
router.post("/user/add/query", addQuery);
router.put("/user/task/submit", submitTask);

module.exports = router;
