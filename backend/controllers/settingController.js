const User = require("../models/User");
const bcrypt = require("bcryptjs");
const ChangePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, error: "wrong Old Password" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const newUser = await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashPassword }
    );
    return res.status(200).json({ success: true });
  } catch (error) {}
};
module.exports = { ChangePassword };