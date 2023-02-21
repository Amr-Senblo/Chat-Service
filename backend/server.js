const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("../data/data");

dotenv.config();
const app = express();

// creating a simple API
app.get("/", (req, res) => {
  res.send("API is running !!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  // console.log(req);
  // res.send(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 6969;
app.listen(6969, console.log(`server is listening on port ${PORT}...`));
