
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")
const fs = require("fs")
const path = require("path")

const employeeRoutes = require("./routes/employee")
const userRoutes = require("./routes/user")
const errorHandler = require("./middleware/errorHandler")

const app = express()


const SERVER_PORT = process.env.PORT || 3001

const logsFolder = path.join(__dirname, "logs")

if (!fs.existsSync(logsFolder)) {
    fs.mkdirSync(logsFolder)
}

app.use((req, res, next) => {
    const start = Date.now()

    res.on("finish", () => {
        const log = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms\n`

        fs.appendFile(
            path.join(logsFolder, "requests.log"),
            log,
            (err) => {
                if (err) console.error("Request logging failed:", err.message)
            }
        )
    })

    next()
})

app.use(helmet())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/emp", employeeRoutes)
app.use("/api/v1/user", userRoutes)

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK"
    })
})

app.route("/")
    .get((req, res) => {
        res.send("<h1>COMP3123 Assignment 1 - Employee Management API</h1>")
    })

    app.use(errorHandler)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB Atlas")

        app.listen(SERVER_PORT, () => {
            console.log(`Server running at http://localhost:${SERVER_PORT}/`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err.message)
    })
