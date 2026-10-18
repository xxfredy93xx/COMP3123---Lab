
const fs = require("fs")
const path = require("path")

const errorHandler = (err, req, res, next) => {
    console.error(err)

    //Save application errors to a local file
    const log = `${new Date().toISOString()} ${err.stack || err.message}\n`

    fs.appendFile(
        path.join(__dirname, "../logs/errors.log"),
        log,
        (error) => {
            if (error) console.error("Error logging failed:", error.message)
        }
    )

    const statusCode = err.status || err.statusCode || 500

    res.status(statusCode).json({
        message: statusCode === 500
            ? "Server error"
            : err.message || "Request failed"
    })
}

module.exports = errorHandler
