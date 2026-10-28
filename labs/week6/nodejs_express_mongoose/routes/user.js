const UserModel = require("../models/user")
const jwt = require("jsonwebtoken")
const routes = require("express").Router()
//register a new user
routes.post("/register", async (req, res) =>{
    try {
        const {name, email, password} = req.body

        //check if user already exists
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({message: "user already exists"})
        } 

        //create new user
        const newUser = new UserModel({ name, email, password })
        await newUser.save()

        res.status(201).json({message: "user registered successully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "server error"})
    }
});

//login user 
routes.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body

        //find user by email
        const user = await UserModel.findOne({email }).select("+password")
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        //check if the password is correct
        const isPasswordValid = user.password === password
        if (!isPasswordValid) {
            return res.status(400).json({message: "invalid email or password"})
        }

        // generate a jwt token
        const jwt = require("jsonwebtoken")
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
        })

        res.status(200).json({ token })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "server error"})
    }
})

module.exports = routes