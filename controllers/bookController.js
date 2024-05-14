// const booksData = require("../data/data-1");
const Book = require("../models/bookModel");

const getAllBooks = async (req, res, next) => {
    // try {
    if (200) {
    await Book.find({}).then((books) =>  
    res.status(200).json({success: {message: "Success! Found all comics!"}, data: books, statusCode: 200}))
    }
    /*
    } catch (error) {
        res.status(400).json({error: {message:"Error! Something went wrong getting all the books"}, data: comics, statusCode: 400});
    };
    */
};

/* EXPERIMENTAL: Code to find book by ID without a line of code for each ID:
const getBook = async (req, res, next) => {
    const {id} = req.params;
    const stringId = id.toString();
    console.log(stringId)
    const foundBook = booksData.find(books => books.id === Number(id));
    // console.log(foundBook);
    try { 
        if (200) {
            if (foundBook) {
            res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } 
            else {
            res.status(400).json({error: {message: "This books doesn't exist, try searching again", statusCode: 400}});
            console.log("Book not found")
            }
        }
    } catch (error) {
        res.status(400).json({error: {message: "Error! Something went wrong retrieving a book!", statusCode: 400}})
    }
};
*/

// /*
const getBook = async (req, res, next) => {
    const {id} = req.params;
    // const foundBook = booksData.find(book => book.id === Number(id));
    /*
    try { 
        if (200) {
            let params = req.params;
            if (params.id === "1") {
            res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "2") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "3") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "4") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "5") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "6") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "7") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "8") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "9") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "10") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "11") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else if (params.id === "12") {
                res.status(200).json({success: {message: "Success! Found the book you are looking for!"}, data: foundBook, statusCode: 200})
            } else {
                res.status(400).json({error: {message: "This books doesn't exist, try searching again", statusCode: 400}});
                console.log("Book not found")
            }
        }
    } catch (error) {
        res.status(400).json({error: {message: "Error! Something went wrong retrieving a book!", statusCode: 400}})
    }*/
    await Book.findOne({_id: id}).then((books) => {
        res.status(200).json({success: {message: "Success! Found the book you are looking for"}, data: books, statusCode: 200})
    })
};


const createBook = async (res, req, next) => {
    
    const {title, author, publisher, genre, pages, rating, synopsis } = req.body;
    
    const newBook = new Book({
        title: title,
        author: author,
        publisher: publisher,
        genre: genre,
        pages: pages,
        rating: rating,
        synopsis: synopsis
    })
    
    try {
        await newBook.save();
        res.status(201).json({success: {message: "A new book is created", data: newBook, statusCode: 201}});
        
    } catch (error) {
        res.status(400).json({error: {message: "Something went wrong creating a book!", statusCode: 400}})
    } 
}

const editBook = async (req, res, next) => {
    const {id} = req.params;
    const {title, author, publisher, genre, pages, rating, synopsis } = req.body;

    try {
        await Book.findByIdAndUpdate(
            id, 
            {$set: {
                title,
                author,
                publisher,
                genre,
                pages,
                rating,
                synopsis
            }},
            {new: true}
        )
        res.status(201).json({success: {message: "Book is updated", data: newBook, statusCode: 201}})
        
    } catch (error) {
        res.status(400).json({error: {message: "Something went wrong while editing the book~", statusCode: 400}})
    }

}

const deleteBook = async (res, req, next) => {
    const {id} = req.params;

    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({success: {message: "Book deleted successfully", statusCode: 200}});
    } catch (error) {
        res.status(400).json({success: {message: "Something went wrong while deleting the book!", statusCode: 400}});
    }
}

module.exports = {getAllBooks, getBook, createBook, editBook, deleteBook}; 
//these are also referenced as variables on the bookRoutes file