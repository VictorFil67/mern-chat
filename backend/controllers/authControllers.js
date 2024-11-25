import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

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
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
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
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    const isTokenCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    console.log(isTokenCorrect);
    if (!user || !isTokenCorrect) {
      return res.status(400).json("Invalid credentials");
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in signin controller", error.message);
    res.status(500).json({ error: "Intermal server error" });
  }
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Loged out successfully");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Intermal server error" });
  }
};
export default { signup, login, logout };
