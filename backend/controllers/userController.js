const User = require("../models/User");
const bcrypt = require("bcrypt");

// 비밀번호 변경
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });

    // 현재 비밀번호 검증
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: "현재 비밀번호가 올바르지 않습니다" });

    // 새 비밀번호 해시 후 저장
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "비밀번호가 성공적으로 변경되었습니다" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
