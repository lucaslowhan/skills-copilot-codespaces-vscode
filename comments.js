// Create web server
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

app.get("/comments", (req, res) => {
  fs.readFile("./comments.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }
    res.send(JSON.parse(data));
  });
});

app.post("/comments", (req, res) => {
  const newComment = req.body;
  fs.readFile("./comments.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file");
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile("./comments.json", JSON.stringify(comments), "utf8", err => {