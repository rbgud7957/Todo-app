// controllers/todoController.js
const Todo = require("../models/Todo");
const mongoose = require("mongoose");

// 할 일 생성
exports.createTodo = async (req, res) => {
  try {
    const { title, completed, dueDate, priority, category } = req.body; // category 추가

    const todo = new Todo({
      title,
      completed,
      dueDate, // 마감일
      priority, // 우선순위
      category, // 카테고리
      user: req.user.id,   // 로그인한 유저의 ID
    });

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// 로그인한 유저의 할 일 조회 (카테고리 필터링 지원)
exports.getTodos = async (req, res) => {
  try {
    const filter = { user: req.user.id };

    // 쿼리 파라미터로 카테고리 필터링 (예: /api/todos?category=study)
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 할 일 수정
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // 본인 소유만 수정 가능
      req.body,  // category도 수정 가능
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: "할 일을 찾을 수 없습니다" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 할 일 삭제
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

// Todo 통계 API
exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Todo.countDocuments({ user: userId });
    const completed = await Todo.countDocuments({ user: userId, completed: true });
    const today = await Todo.countDocuments({
      user: userId,
      dueDate: { 
        $gte: new Date().setHours(0,0,0,0),  // 오늘 0시 이후
        $lt: new Date().setHours(23,59,59,999) // 오늘 23:59 이전
      }
    });

    // 우선순위별 개수
    const priorityStats = await Todo.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$priority", count: { $sum: 1 } } }
    ]);

    // 카테고리별 개수
    const categoryStats = await Todo.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    const stats = {
      total,
      completed,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      dueToday: today,
      priorityStats,
      categoryStats // 카테고리 통계 추가
    };

    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
