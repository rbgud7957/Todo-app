// controllers/todoController.js
const Todo = require("../models/Todo");

// ✅ 할 일 생성
exports.createTodo = async (req, res) => {
  try {
    const { title, completed, dueDate, priority } = req.body;

    const todo = new Todo({
      title,
      completed,
      dueDate, // 🔥 마감일 추가
      priority, // 🔥 중요도 옵션 (추가하고 싶으면 모델에 넣기)
      user: req.user.id,   // 로그인한 유저의 ID
    });

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// ✅ 로그인한 유저의 할 일 조회
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ 할 일 수정
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // 본인 소유만 수정 가능
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: "할 일을 찾을 수 없습니다" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ 할 일 삭제
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // 본인 소유만 삭제 가능
    });
    if (!todo) return res.status(404).json({ error: "할 일을 찾을 수 없습니다" });
    res.json({ message: "삭제 완료" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
