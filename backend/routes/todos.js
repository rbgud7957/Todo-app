const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, todoController.createTodo);
router.get("/", verifyToken, todoController.getTodos);
router.put("/:id", verifyToken, todoController.updateTodo);
router.delete("/:id", verifyToken, todoController.deleteTodo);
router.get("/stats", verifyToken, todoController.getStats);

module.exports = router;
