import express from "express";
import messageControllers from "../controllers/messageControllers.js";

const messageRouter = express.Router();

const { sendMessage } = messageControllers;

messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
