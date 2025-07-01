const {Router} = require("express");
const userPageCoontroller = require("../controllers/userPageController.js");
const {isLoggedIn} = require("../utils/authMiddleware.js");



const userPageRoute = Router();


userPageRoute.get("/", isLoggedIn, userPageCoontroller.userPageGet);



module.exports = userPageRoute;