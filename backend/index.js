// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",

  // production domain
  "https://todo-app-eight-alpha-53.vercel.app",

  // main branch preview domain
  "https://todo-app-git-main-rbguds-projects.vercel.app",
];

// preview deploy URL 전체 허용
const vercelPreviewRegex =
  /^https:\/\/todo-[a-z0-9\-]+-rbguds-projects\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS 차단된 요청:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

app.get("/", (req, res) => {
  res.send("To-Do 앱 API 서버");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
