import User from "../models/User.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    const newUser = await User.create(req.body);
    res.json({
      fullName: newUser.fullName,
      userName: newUser.userName,
      password: newUser.password,
      gender: newUser.gender,
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json(error.message);
    // return res.status(400).json("Intermal server error");
  }
};
const login = (req, res) => {
  try {
    console.log("signin");
    res.json("Login Route");
  } catch (error) {}
};
const logout = (req, res) => {
  try {
    console.log("logout");
    res.json("Logout Route");
  } catch (error) {}
};
export default { signup, login, logout };
