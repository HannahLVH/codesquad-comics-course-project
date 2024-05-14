const mongoose = require("mongoose");

const {Schema} = mongoose;

const bookSchema = new Schema ({
    title: {
        type: String,
        //required: [true, "A title is required"],
    },
    author: {
        type: String,
        //required: [true, "The author's name is required"],
    },
    publisher: {
        type: String,
        //required: [true, "The publisher's name is required"],
    },
    genre: {
        type: String,
        //required: [true, "The book genre is required"],
    },
    pages: {
        type: Number,
        //required: [true, "The number of pages is required"],
        //min: [1, "Minimum number of pages is 1"],
    },
    rating: {
        type: Number,
        //required: [true, "The rating is required"],
        //min: [1, "Minimum number of star rating is 1"],
        //max: [5, "Maximum number of start rating is 5"],
    },
    synopsis: {
        type: String,
        //required:[true, "A synopsis is required"],
        //minLength: [10, "A minimum of 10 characters is required"],
    },
    image: {
        type: String,
    },
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;