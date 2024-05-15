const passport = require("passport");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/userModel");

passport.use(
    new LocalStrategy(
        (verify = (username, password, done) => {
            User.findOne({username: username}).then((user) => {
                if(!user){
                    return done(null, false, {message: "User not found"});
                }
                bcrypt.compare(password, user.password, (error, result) => {
                    console.log(result == true);
                    console.log("result", result)
                    if (error) {
                        return done(error);
                    }
                    return done(null, user);
                });
            })
            .catch((error) => {
                console.log(`${error}`);
                console.log(`There was an error finding user from database: ${error}`)
            });
        }) 
    )
);

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github",
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://codesquad-comics-course-project.onrender.com/auth/google/",
    scope: ["profile"]
    },
    (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});