const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const userController = require("../controllers/userController");

const router = express.Router();

// 비밀번호 변경 (로그인 필요)
router.post("/change-password", authMiddleware(), userController.changePassword);

module.exports = router;
