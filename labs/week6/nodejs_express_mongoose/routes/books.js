const express = require("express")
const BookModel = require("../models/book")
const routes = express.Router()
const mongoose = require(`mongoose`)
const authMiddleware = require("../middleware/auth")
//Get All Books
routes.get("/books", authMiddleware, async(req, res) => {
    try{
        const books = await BookModel.find()
        res.send(books)
    } catch(err){
        res.status(500).send({ message: err.message || "some error occured."})
    }
})

//Add NEW Book
routes.post("/books", async(req, res) => {
    try{
        const book = new BookModel(req.body)
        const savedBook = await book.save()
        res.status(201).send(savedBook)
    } catch (err) {
        res.status(400).send({ message: err.message || "Some error accured."})
    }
})

//Update existing Book By Id
routes.put("/book/:bookid", async(req, res) => {
    const bookid = req.params.bookid
    try{
        if(!mongoose.Types.ObjectId.isValid(bookid)){
            return res.status(400).send({message: "Invalid ID"})
        }
const book = await BookModel.findByIdAndUpdate(bookid, req.body, {new: true})
        if (!book){
            return res.status(404).send({message: "Book not found"})
        }
        res.send(book)
    } catch (err) {
        res.status(400).send({message: err.message || "Some error occured while updating the book"})
    }
})

//Delete Book By ID
routes.delete("/book/:bookid", async (req, res) => {
    const bookid = req.params.bookid

    try{
        if(!mongoose.Types.ObjectId.isValid(bookid)){
            return res.status(400).send({message: "Invalid ID"})
        }
        const book = await BookModel.findByIdAndDelete(req.params.bookid)
        //const book await BookModel.findByIdAndDelete(req.params.bookid)
        if (!book){
            return res.status(404).send({ message: "Book not found" })
        }
        res.send({message: "Book deleted successfully"})
    }catch (err){
        res.status(500).send({message: err.message || "Some error occured while deleting"})
    }

})

//Get Book By ID
routes.get("/book/:bookid", async (req, res) => {
    const bookid = req.params.bookid;
    try{

        if(!mongoose.Types.ObjectId.isValid(bookid)){
            return res.status(400).send({message: "Invalid ID"})
        }
        const book = await BookModel.findById(bookid)
        if (!book){
            return res.status(404).send({message: "Book not found"})
        }
        res.send(book)
    }catch(err){
        res.status(500).send({message: err.message || "Some error occured while getting book"})
    }
})

//Get All Books in sorted order
routes.get("/books/sort", async (req, res) => {
    try {
        const books = await BookModel.find().sort({publishedYear: 1})//sort by year ascending
        res.send(books)
    } catch (err){
        res.status(500).send({ message: err.message || "some error occurred while retrieving book"})
    }
})

//get all books by published year
routes.get("/books/year/:year", async(req, res) =>{
    const year = req.params.year;
    try{
        const books = await BookModel.find({ publishedYear: year});
        res.send(books)
    } catch (err) {
        res.status(500).send({message: err.meaage|| "some error occured while retrieving"})
    }
})

module.exports = routes