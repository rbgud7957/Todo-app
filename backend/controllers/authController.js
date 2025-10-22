const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // 액세스 토큰 (짧게)
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // 리프레시 토큰 (길게)
  );

  return { accessToken, refreshToken };
};

// 회원가입
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 중복 이메일 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 유저 생성
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // 토큰 발급
    const tokens = generateTokens(user);

    // refreshToken 저장
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.status(201).json({ message: "회원가입 성공", tokens });
  } catch (err) {
    console.error("회원가입 오류:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 유저 확인
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "이메일 또는 비밀번호를 확인하세요." });

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "이메일 또는 비밀번호를 확인하세요." });

    // 토큰 발급
    const tokens = generateTokens(user);

    // refreshToken 저장
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json({ message: "로그인 성공", tokens });
  } catch (err) {
    console.error("로그인 오류:", err);
    res.status(500).json({ message: "로그인 실패", error: err.message });
  }
};

// 토큰 재발급
exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Refresh Token 없음" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "유효하지 않은 Refresh Token" });
    }

    const tokens = generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json(tokens);
  } catch (err) {
    console.error("토큰 재발급 오류:", err);
    res.status(403).json({ message: "Refresh Token 만료/유효하지 않음" });
  }
};
