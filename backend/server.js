import express from "express";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
// app.use(express.json());

const { PORT = 8000 } = process.env;

app.use("/api/users", authRouter);

app.listen(5000, () => console.log(`Server is  running at port ${PORT}`));
