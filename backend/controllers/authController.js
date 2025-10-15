const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // 짧게
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // 길게
  );

  return { accessToken, refreshToken };
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "유저 없음" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "비밀번호 틀림" });

    const tokens = generateTokens(user);

    // refreshToken을 DB에 저장 (유저 모델에 필드 추가)
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json(tokens);
  } catch (err) {
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
    res.status(403).json({ message: "Refresh Token 만료/유효하지 않음" });
  }
};
