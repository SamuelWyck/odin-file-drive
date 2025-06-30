const {Router} = require("express");
const authController = require("../controllers/authController.js");



const authRoute = Router();


authRoute.get("/signup", authController.signUpGet);
authRoute.post("/signup", authController.signUpPost);
authRoute.get("/login", authController.logInGet);



module.exports = authRoute;