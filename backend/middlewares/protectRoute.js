import jwt from "jsonwebtoken";
import User from "../models/User.js";

const { JWT_SECRET } = process.env;

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const detected = jwt.verify(token, JWT_SECRET);
    console.log(detected);
    if (detected) {
      return res.status(401).json({ error: "Unauthorized: invalid token" });
    }
    const { userId } = detected;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json("Internal server error");
  }
};

export default protectRoute;
