const {Router} = require("express");
const userPageController = require("../controllers/userPageController.js");
const {isLoggedIn} = require("../utils/authMiddleware.js");
const parseFilePath = require("../utils/parseFilePathMiddleware.js");



const userPageRoute = Router();


userPageRoute.get("/{*path}", isLoggedIn, parseFilePath, userPageController.folderPageGet);



module.exports = userPageRoute;