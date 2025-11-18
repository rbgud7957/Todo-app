require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://todo-frontend.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch(err => console.error("MongoDB 연결 실패: ", err));

app.get('/', (req, res) => {
  res.send('To-Do 앱 API 서버');
});

app.use('/api/auth', require('./routes/auth'));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/admin", require("./routes/admin"));

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
