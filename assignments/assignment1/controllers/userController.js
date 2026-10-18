
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).send({message: "All fields are required"})
        }

        if (typeof username !== "string" ||
            !/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
            return res.status(400).send({message: "Invalid username"})
        }

        if (typeof email !== "string" ||
            email.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).send({message: "Invalid email"})
        }

        if (typeof password !== "string" ||
            password.length < 8 ||
            Buffer.byteLength(password, "utf8") > 72) {
            return res.status(400).send({message: "Invalid password"})
        }

        const existingUser = await User.findOne({
            $or: [
                {username: username},
                {email: email.toLowerCase()}
            ]
        })

        if (existingUser) {
            return res.status(409).send({message: "Username or email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword
        })

        await newUser.save()

        res.status(201).send({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send({message: "Username or email already exists"})
        }

        console.log(err.message)
        res.status(500).send({message: "Server error"})
    }
}

const login = async (req, res) => {
    try {
        const {username, email, password} = req.body

        //Check required fields
        if ((!username && !email) || !password) {
            return res.status(400).send({message: "Username/email and password are required"})
        }

        if (typeof password !== "string" ||
            (username && typeof username !== "string") ||
            (email && typeof email !== "string")) {
            return res.status(400).send({message: "Invalid login information"})
        }

        const user = await User.findOne(
            email ? {email: email.toLowerCase()} : {username: username}
        )

        if (!user) {
            return res.status(401).send({message: "Invalid credentials"})
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).send({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            {id: user._id.toString()},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).send({
            message: "Login successful",
            token: token
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).send({message: "Server error"})
    }
}

module.exports = {signup, login}
