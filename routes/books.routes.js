const express = require("express");

const { BookModel } = require("../models/book.model");

const BookRouter = express.Router();

BookRouter.get("/getallbooks", async (req, res) => {
    try {
        const books = await BookModel.find();
        res.send(books);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

BookRouter.post("/addbook", async (req, res) => {
    try {
        const { title, author, genre, description, price } = req.body;

        const ifBookPresent = await BookModel.findOne({ title, author });
        if (ifBookPresent) {
            return res.status(400).json({ msg: "Book present add new book !!" });
        } else {
            const addBook = new BookModel({ title, author, genre, description, price });
            await addBook.save();

            res.send({ msg: "Book added  !! " });
        }
    } catch (err) {
        res.status(500).send({ msg: "Could not add book", error: err.message });
    }
});
BookRouter.delete("/delete-book/:id", async (req, res) => {

    const ID = req.params.id;
    try {
      await BookModel.findByIdAndDelete({ _id: ID });
      res.send({ msg: "Book has been deleted " });
    } catch (err) {
      res.send({ msg: "Cannot delete the book", error: err.message });
    }
  });

module.exports = {
    BookRouter
};