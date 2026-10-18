
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
         return res.status(401).send({message: "Access denied. No token provided"})
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id)

        if (!user) {
          return res.status(401).send({message: "Invalid user"})
        }

        req.userId = user._id

        next()

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send({message: "Token expired"})
        }

        return res.status(401).send({message: "Invalid token"})
    }
}

module.exports = auth
