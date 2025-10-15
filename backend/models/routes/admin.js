const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");

router.get("/dashboard", authMiddleware(["admin"]), (req, res) => {
  res.send("관리자 대시보드");
});

module.exports = router;
