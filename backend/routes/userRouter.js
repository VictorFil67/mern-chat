import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import userControllers from "../controllers/userControllers.js";

const userRouter = express.Router();

const { getUsersForSidebar } = userControllers;

userRouter.get("/", protectRoute, getUsersForSidebar);

export default userRouter;
