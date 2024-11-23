import express from "express";
import authControllers from "../controllers/authControllers.js";

const authRouter = express.Router();

const { signup } = authControllers;

authRouter.post("/signup", signup);
authRouter.get("/login", (req, res) => {
  console.log("Login Route");
  res.send("Login Route");
});
// authRouter.post("/login", login);
// authRouter.post("/logout", logout);

export default authRouter;
