import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import { generateJwtToken } from "../middleware/generateJwtToken.js";

// create user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const payload = { name, email, password: hashPassword };
    const user = new User(payload);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login api
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password. Please enter the correct password.",
      });
    }
    const userData = { name: user.name, email: user.email };
    const token = generateJwtToken({ userId: user._id, email: user.email });
    res.status(200).json({ message: "Login successful", userData, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
