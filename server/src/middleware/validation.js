import userSchema from "../models/userModel.js";

export const userValidation = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const exitUser = await userSchema.aggregate([
      { $match: { email: email } },
    ]);
    if (exitUser.length > 0) {
      return res.status(400).json({ message: "Email already exists", status: 400 });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match", status: 400 });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", status: 400 });
  }
};
