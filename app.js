require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");

// PACKAGES
const express = require("express");


// MIDDLEWARE SECTION
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const helmet = require("helmet");
const session= require("express-session");
const passport = require("passport");

app.use(morgan("dev"));

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize()); 
app.use(passport.session());

// 5 ROUTES
app.get("/", (req, res, next) => {
    // res.send("This route points to the Home page");
    // res.status(200).json({success: {message: "This route points to the Home page"}, statusCode: 200});
    res.send(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1> Test for Deployment </h1>
            <p> Are you able to see this? </p>
        </body>
        </html>`)
});

/*
app.get("/about", (req, res, next) => {
    // res.send("This route points to the About page");
    res.status(200).json({success: {message: "This route points to the About page"}});
});

app.get("/login", (req, res, next) => {
    // res.send("This route points to the Login page");
    res.status(200).json({success: {message: "This route points to the Login page"}});
});

app.get("/admin", (req, res, next) => {
    // res.send("This route points to the Admin Console page");
    res.status(200).json({success: {message: "This route points to the Admin page. Restricted access only."}});
});

app.get("/admin/create-book", (req, res, next) => {
    // res.send("This route points to the Create Book page");
    res.status(200).json({success: {message: "This route points to the Admin Create Book page. Restricted access only"}});
});
*/

// Detect requests from routers:
// app.use("/api/books", bookRoutes); //-> we don't need "/api/books" anymore because that is now referenced in bookRoutes.js
// Request ONLY bookRoutes.js below:
app.use("/api/books", bookRoutes); //this is using the constant from line 4 in the app.js file
app.use("/", authRoutes);

// SERVER
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});