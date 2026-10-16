const express = require("express");
const routes = express.Router();

// Define your college routes here
routes.get("/", (req, res) => {
  res.send({
    version: "2.0",
    method: "GET",
    path: `/college`,
    message: "Welcome to the College API v2"
  });
});

module.exports = routes;