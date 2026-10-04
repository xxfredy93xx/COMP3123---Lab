const express = require("express");

const routes = express.Router();

// http://localhost:3000/students (GET)
routes.get("/", (req, res) => {
  //res.send('<h1>List of students</h1>');
  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];
  //res.send(students);
  res.status(200).json(students);
});

// http://localhost:3000/students (POST)
routes.post("/", (req, res) => {
  res.send("<h1>Student created successfully!</h1>");
});

module.exports = routes;