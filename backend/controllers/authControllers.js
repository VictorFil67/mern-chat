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
    // const hashPassword = await bcryptjs.hash(password, 10); **you can so**
    const boyProfileAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfileAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    //the first variant
    // const newUser = await User.create({
    //   ...req.body,
    //   password: hashPassword,
    //   profilePic: gender === "male" ? boyProfileAvatar : girlProfileAvatar,
    // });

    //the second variant
    const newUser = new User({
      ...req.body,
      password: hashPassword,
      profilePic: gender === "male" ? boyProfileAvatar : girlProfileAvatar,
    });

    if (newUser) {
      await newUser.save();

      res.status(201).json({
        fullName: newUser.fullName,
        userName: newUser.userName,
        password: newUser.password,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid request data" });
    }
    //******************************************//
  } catch (error) {
    console.log("Error in signup controller", error.message);
    // res.status(400).json(error.message);
    res.status(500).json({ error: "Intermal server error" });
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
