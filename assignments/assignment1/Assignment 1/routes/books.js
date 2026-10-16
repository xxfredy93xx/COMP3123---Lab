const express = require("express")

const routes = express.Router()

//Get All Books
routes.get("/books", (req, res) => {
    res.send({message: "Get All Books"})
})

//Add NEW Book
routes.post("/books", (req, res) => {
    res.send({message: "Add NEW Book"})
})

//Update existing Book By Id
routes.post("/book/:bookid", (req, res) => {
    res.send({message: "Update existing Book By Id"})
})

//Delete Book By ID
routes.delete("/book/:bookid", (req, res) => {
    res.send({message: "Delete Book By ID"})
})

//Get Book By ID
routes.get("/book/:bookid", (req, res) => {
    res.send({message: "Get Book By ID"})
})

//Get All Books in sorted order
routes.get("/books/sort", (req, res) => {
    res.send({message: "Get All Books in sorted order"})
})

module.exports = routes