import userSchema from "../models/userModel.js";
import { hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcrypt";

export const createUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const confirmPassword = req.body.password;
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Password do not match", status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new userSchema({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Server Error", status: 500 });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user.email) {
      return res.status(404).json({ message: "User not found", status: 400 });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password", status: 400 });
    }
    // Generate JWT token
    const token = generateToken(user._id);
    res.status(200).json({ message: "Login Successful", token, user, status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Failed to login", status: 500 });
  }
};

// const setCookies = (token) => {
//   res.cookie("abinshtoken", token, {
//     maxAge: 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   });
// };
