// import { listen } from "engine.io";
import express from "express";

const app = express();

app.listen(5000, () => console.log("Server is  running at port 5000"));