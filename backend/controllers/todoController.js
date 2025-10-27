const Todo = require("../models/Todo");
const mongoose = require("mongoose");

// 할 일 생성
exports.createTodo = async (req, res) => {
  try {
    const { title, completed, dueDate, priority, category } = req.body;

    if (!title) {
      return res.status(400).json({ message: "할 일 제목이 필요합니다." });
    }

    const todo = new Todo({
      title,
      completed: completed || false,
      dueDate,
      priority,
      category,
      userId: req.user.id, // verifyToken에서 받은 사용자 ID
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error("Todo 생성 오류:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 로그인한 유저의 할 일 조회
exports.getTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      search,
      completed,
      priority,
      category,
      dueDate,
      sortBy,
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { userId };

    if (search) filter.title = { $regex: search, $options: "i" };
    if (completed !== undefined) filter.completed = completed === "true";
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    if (dueDate) {
      const start = new Date(dueDate);
      const end = new Date(dueDate);
      end.setHours(23, 59, 59, 999);
      filter.dueDate = { $gte: start, $lte: end };
    }

    const sortOptions = sortBy
      ? { [sortBy]: order === "asc" ? 1 : -1 }
      : { createdAt: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const todos = await Todo.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Todo.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      todos,
    });
  } catch (err) {
    console.error("Todo 조회 오류:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 할 일 수정
exports.updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
    }

    res.json(updated);
  } catch (err) {
    console.error("Todo 수정 오류:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 할 일 삭제
exports.deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
    }

    res.json({ message: "삭제 완료" });
  } catch (err) {
    console.error("Todo 삭제 오류:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 통계 API
exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Todo.countDocuments({ userId });
    const completed = await Todo.countDocuments({ userId, completed: true });
    const today = await Todo.countDocuments({
      userId,
      dueDate: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    const priorityStats = await Todo.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const categoryStats = await Todo.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json({
      total,
      completed,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      dueToday: today,
      priorityStats,
      categoryStats,
    });
  } catch (err) {
    console.error("통계 조회 오류:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};
