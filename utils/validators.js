const {body} = require("express-validator");
const db = require("../db/querys.js");



async function isUniqueUsername(username) {
    const user = await db.findUniqueUser({
        where: {
            username: username
        }
    });
    isUnique = (!user) ? true : false;
    return user;
};


function passwordsMatch(password, {req}) {
    return password === req.body.password;
};


const emptyMessage = "must not be empty";
const tooShortMessage = "must be at least";


const signUpValidator = [
    body("firstname").trim()
        .notEmpty().withMessage(`Firstname ${emptyMessage}`),
    body("lastname").trim()
        .notEmpty().withMessage(`Lastname ${emptyMessage}`),
    body("username").trim()
        .notEmpty().withMessage(`Username ${emptyMessage}`)
        .isLength({min: 4}).withMessage(`Username ${tooShortMessage} 4 characters`)
        .matches(/^[^\s]+$/).withMessage("Username must not contain spaces")
        .matches(/[^\d]/).withMessage("Username must contain at least one letter")
        .custom(isUniqueUsername).withMessage("Username already in use"),
    body("password")
        .notEmpty().withMessage(`Password ${emptyMessage}`),
    body("confirm")
        .custom(passwordsMatch).withMessage("Passwords do not match")
];



module.exports = {
    signUpValidator
};