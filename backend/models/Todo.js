const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // 어떤 사용자가 작성한 Todo인지
  userId: {  // 기존 user → userId 로 변경
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 할 일 제목
  title: {
    type: String,
    required: true,
    trim: true,
  },

  // 완료 여부
  completed: {
    type: Boolean,
    default: false,
  },

  // 마감일
  dueDate: {
    type: Date,
  },

  // 우선순위
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

  // 카테고리 (work, personal, study, etc)
  category: {
    type: String,
    enum: ["work", "personal", "study", "etc"],
    default: "etc",
  },

  // 생성일 (자동으로 현재 시간 저장)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
