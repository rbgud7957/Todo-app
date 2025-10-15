const Todo = require("../models/Todo");
const mongoose = require("mongoose");

// 할 일 생성
exports.createTodo = async (req, res) => {
  try {
    const { title, completed, dueDate, priority, category } = req.body;

    const todo = new Todo({
      title,
      completed,
      dueDate,
      priority,
      category,
      user: req.user.id,
    });

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 로그인한 유저의 할 일 조회 (검색 + 필터 + 정렬 + 페이징)
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

    const filter = { user: userId };

    // 제목 검색
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // 완료 여부 필터
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    // 우선순위 필터
    if (priority) {
      filter.priority = priority;
    }

    // 카테고리 필터
    if (category) {
      filter.category = category;
    }

    // 특정 날짜 마감일 필터
    if (dueDate) {
      const start = new Date(dueDate);
      const end = new Date(dueDate);
      end.setHours(23, 59, 59, 999);
      filter.dueDate = { $gte: start, $lte: end };
    }

    // 정렬 기준 설정
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "asc" ? 1 : -1;
    } else {
      sortOptions.createdAt = -1; // 기본: 최신순
    }

    // 페이징 계산
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // 데이터 조회
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
    res.status(400).json({ error: err.message });
  }
};

// 할 일 수정
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
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
      user: req.user.id,
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
    const completed = await Todo.countDocuments({
      user: userId,
      completed: true,
    });
    const today = await Todo.countDocuments({
      user: userId,
      dueDate: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

   //우선 순위별 개수
    const priorityStats = await Todo.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

  //카테고리별 개수
    const categoryStats = await Todo.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const stats = {
      total,
      completed,
      completionRate:
        total > 0 ? Math.round((completed / total) * 100) : 0,
      dueToday: today,
      priorityStats,
      categoryStats,
    };

    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
