const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "인증 토큰 없음" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // 토큰에서 userId 꺼내서 저장
    next();
  } catch (err) {
    res.status(401).json({ message: "유효하지 않은 토큰" });
  }
}

module.exports = authMiddleware;
