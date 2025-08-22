// routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 모든 할 일 가져오기
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// 새 할 일 추가
router.post('/', async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

// 완료 여부 수정
router.put('/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updatedTodo);
});

// 할 일 삭제
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: '삭제 완료' });
});

module.exports = router;

const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  res.json(todos);
});
