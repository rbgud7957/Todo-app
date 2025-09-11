const jwt = require("jsonwebtoken");

exports.authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "토큰 없음" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id, role: decoded.role };

      // role 체크
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "권한 없음" });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "토큰 유효하지 않음" });
    }
  };
};
