import express from "express";
import authRouter from "./routes/authRouter";

const app = express();

app.use("api/users", authRouter);

app.get("/", (req, res) => {
  console.log("Hello server!");
  //   res.send("Hello server!");
  res.json("Hello server!");
});

app.listen(5000, () => console.log("Server is  running at port 5000"));
