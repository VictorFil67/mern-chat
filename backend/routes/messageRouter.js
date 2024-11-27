import express from "express";
import messageControllers from "../controllers/messageControllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const messageRouter = express.Router();

const { sendMessage, getMessages } = messageControllers;

messageRouter.post("/send/:id", protectRoute, sendMessage);
messageRouter.get("/:id", protectRoute, getMessages);

export default messageRouter;
