const express = require("express");
const router = express.Router();

// 5 NEW ROUTES

const {getAllBooks, getBook, createBook, editBook, deleteBook} = require("../controllers/bookController");

// All router operations now live in the controller which we are requiring with "const getAllBooks" above

/*
// These substitute the "req, res, next" functions which now live in booksController.js
router.get("/api/books", getAllBooks);
router.get("/api/books/:id", getBook);
router.post("/api/books/create/new", createBook);
router.put("/api/books/edit/:id", editBook);
router.delete("/api/books/delete/:id", deleteBook);

//For testing purposes:
router.get("/api/books/create/new", (req, res, next) => {
    res.json("You're in the path to create a book")
})
router.get("/api/books/edit/:id", (req, res, next) => {
    res.json("You're in the path to edit a book")
})
router.get("/api/books/delete/:id", (req, res, next) => {
    res.json("You're in the path to delete a book")
})
*/

router.get("/", getAllBooks);
router.get("/get/:id", getBook);
router.post("/create/new", createBook);
router.put("/edit/:id", editBook);
// router.get("/get/edit/:id", editBook);
router.delete("/delete/:id", deleteBook);

//For testing purposes:
router.get("/create/new", (req, res, next) => {
    res.json("You're in the path to create a book")
})
// router.get("/edit/:id", (req, res, next) => {
//     res.json("You're in the path to edit a book")
// })
router.get("/delete/:id", (req, res, next) => {
    res.json("You're in the path to delete a book")
})


module.exports = router;