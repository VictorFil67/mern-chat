import express from "express";
import authControllers from "../controllers/authControllers.js";

const authRouter = express.Router();

const { signup, login, logout } = authControllers;

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
