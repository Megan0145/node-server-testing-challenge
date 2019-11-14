const express = require("express");
const server = express();

const users = require("../users/users-model");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Up and running");
});

server.get("/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: "Something went wrong trying to get users: " + err.message
        });
    });
});

server.post("/users", (req, res) => {
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Something went wrong adding user: " + err.message });
    });
});

module.exports = server;
