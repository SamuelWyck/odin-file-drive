const {Router} = require("express");
const authController = require("../controllers/authController.js");



const authRoute = Router();


authRoute.get("/signup", authController.signUpGet);
authRoute.post("/signup", authController.signUpPost);



module.exports = authRoute;