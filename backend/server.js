import express from "express";
import authRouter from "./routes/authRouter.js";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();
app.use(express.json()); //Is utilizing for extracting fields from req.body(to parse the incoming requests with JSON payloads (from req.body))

const { PORT = 8000 } = process.env;

app.use("/api/users", authRouter);

app.listen(5000, () => {
  connectToMongoDB().then(() =>
    console.log(`Server is  running at port ${PORT}`)
  );
});
