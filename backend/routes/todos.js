// routes/todos.js
const express = require('express');
const { authMiddleware } = require("../middleware/auth");
const todoController = require("../controllers/todoController");

const router = express.Router();

// 할 일 CRUD 라우트 (모두 로그인 필요)
router.post("/", authMiddleware(), todoController.createTodo);
router.get("/", authMiddleware(), todoController.getTodos);
router.put("/:id", authMiddleware(), todoController.updateTodo);
router.delete("/:id", authMiddleware(), todoController.deleteTodo);

// 통계 API
router.get("/stats", authMiddleware(), todoController.getStats);

module.exports = router;
