// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error("MongoDB 연결 실패: ", err));

// 라우트 예시
app.get('/', (req, res) => {
  res.send('To-Do 앱 API 서버');
});

app.listen(5000, () => {
  console.log('서버 실행 중: http://localhost:5000');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.use("/api/todos", require("./routes/todos"));
app.use("/api/admin", require("./routes/admin"));


