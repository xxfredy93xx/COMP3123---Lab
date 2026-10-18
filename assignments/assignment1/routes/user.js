
const express = require("express")
const {rateLimit} = require("express-rate-limit")
const userController = require("../controllers/userController")

const routes = express.Router()

//Limit authentication requests
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        message: "Too many requests. Please try again later."
    }
})

//Register NEW User
routes.post("/signup", authLimiter, userController.signup)

//Login existing User
routes.post("/login", authLimiter, userController.login)

module.exports = routes
