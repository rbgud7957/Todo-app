const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 이미 존재하는 사용자 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "이미 가입된 이메일입니다." });

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 생성
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: "회원가입 성공" });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 확인
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "잘못된 이메일 또는 비밀번호" });

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "잘못된 이메일 또는 비밀번호" });

    // JWT 발급
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,   // 환경변수에서 비밀키 가져오기
      { expiresIn: "1h" }       // 유효기간: 1시간
    );

    res.json({ message: "로그인 성공", token });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
});

module.exports = router;
