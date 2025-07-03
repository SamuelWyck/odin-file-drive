const {body} = require("express-validator");
const db = require("../db/querys.js");



async function isUniqueUsername(username) {
    const user = await db.findUniqueUser({
        where: {
            username: username
        }
    });
    
    if (user) {
        throw new Error();
    }

    return true;
};


function passwordsMatch(password, {req}) {
    return password === req.body.password;
};


async function isUniqueFolderName(folderName, {req}) {
    const folder = await db.findUniqueFolder({
        where: {
            url_name_ownerId: {
                name: folderName,
                url: req.body.parentUrl,
                ownerId: req.user.id
            }
        }
    });

    if (folder) {
        throw new Error();
    }
    return true;
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



const createFolderValidator = [
    body("folderName").trim()
    .notEmpty().withMessage(`Folder name ${emptyMessage}`)
    .matches(/^[^\s]+$/).withMessage("Folder name must not contain spaces")
    .matches(/^[^\/|\\]+$/).withMessage("Folder name must not contain slashes")
    .matches(/^[^\.]+$/).withMessage("Folder name must not contain periods")
    .custom(isUniqueFolderName).withMessage("Folders in the same folder must not have the same name")
]



module.exports = {
    signUpValidator,
    createFolderValidator
};