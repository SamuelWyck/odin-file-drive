const {Router} = require("express");
const userPageCoontroller = require("../controllers/userPageController.js");
const {isLoggedIn} = require("../utils/authMiddleware.js");
const parseFilePath = require("../utils/parseFilePathMiddleware.js");



const userPageRoute = Router();


userPageRoute.get("/{*path}", isLoggedIn, parseFilePath, userPageCoontroller.userPageGet);



module.exports = userPageRoute;