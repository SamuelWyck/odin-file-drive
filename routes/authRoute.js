const {Router} = require("express");
const authController = require("../controllers/authController.js");
const {isLoggedIn, isNotLoggedIn} = require("../utils/authMiddleware.js");



const authRoute = Router();


authRoute.get("/signup", isNotLoggedIn, authController.signUpGet);
authRoute.post("/signup", isNotLoggedIn, authController.signUpPost);
authRoute.get("/login", isNotLoggedIn, authController.logInGet);
authRoute.post("/login", isNotLoggedIn, authController.logInPost);
authRoute.get("/logout", isLoggedIn, authController.logOutGet);



module.exports = authRoute;