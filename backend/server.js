import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("Hello server!");
  //   res.send("Hello server!");
  res.json("Hello server!");
});

app.listen(5000, () => console.log("Server is  running at port 5000"));
