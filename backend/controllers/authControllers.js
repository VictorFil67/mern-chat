import User from "../models/User.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json(`The user ${userName} has allready exist`);
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json(`The password must match the confirmPassword`);
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    // const hashPassword = await bcryptjs.hash(password, 10); you can so
    //the first variant
    // const newUser = await User.create({ ...req.body, password: hashPassword });
    //the second variant
    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();
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
