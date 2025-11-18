// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 설정
// 실제 배포 프론트 도메인과 로컬 도메인 모두 허용
const allowedOrigins = [
  "http://localhost:3000", // 로컬 테스트
  "https://todo-frontend.vercel.app", // 기존 Vercel 프론트
  "https://todo-app-eight-alpha-53.vercel.app" // 현재 배포 프론트
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// JSON Body 처리
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error("MongoDB 연결 실패: ", err));

app.get('/', (req, res) => {
  res.send('To-Do 앱 API 서버');
});

app.use('/api/auth', require('./routes/auth'));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/admin", require("./routes/admin"));

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
