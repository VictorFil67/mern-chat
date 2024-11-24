import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
  });
};

export default generateTokenAndSetCookie;
