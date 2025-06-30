const asyncHandler = require("express-async-handler");
const {validationResult} = require("express-validator");
const {signUpValidator} = require("../utils/validators.js");
const bcrypt = require("bcryptjs");
const db = require("../db/querys.js");
const passport = require("../utils/passport.js");



const signUpGet = asyncHandler(async function(req, res) {
    return res.render("authPage", {
        signUp: true,
        title: "Sign Up"
    });
});


const signUpPost = asyncHandler(async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("authPage", {
            title: "Sign Up",
            signUp: true,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            errors: errors.array()
        });
    }

    const firstname = req.body.firstname.trim();
    const lastname = req.body.lastname.trim();
    const username = req.body.username.trim();
    const pwdHash = await bcrypt.hash(req.body.password, 10);
    await db.createUser({
        data: {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: pwdHash
        }
    });
    return next();
});


const logInGet = asyncHandler(async function(req, res) {
    let errorMsg = null;
    if (req.session.messages) {
        errorMsg = req.session.messages[0];
        delete req.session.messages;
    }

    return res.render("authPage", {
        title: "Log In",
        signUp: false,
        errors: (errorMsg) ? [{msg: errorMsg}] : null
    });
});


const logOutGet = asyncHandler(async function(req, res, next) {
    req.logout(function(error) {
        if (error) {
            return next(error);
        }
        return res.redirect("/auth/login");
    });
});



module.exports = {
    signUpGet,
    signUpPost: [
        signUpValidator,
        signUpPost,
        passport.authenticate("local", {
            successRedirect: "/"
        })
    ],
    logInGet,
    logInPost: [
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/auth/login",
            failureMessage: true
        })
    ],
    logOutGet
};