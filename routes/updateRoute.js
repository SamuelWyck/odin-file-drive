const {Router} = require("express");
const updateController = require("../controllers/updateController.js");
const {isLoggedIn} = require("../utils/authMiddleware.js");



const updateRoute = Router();


updateRoute.post("/file", isLoggedIn, updateController.fileUpdateGet);



module.exports = updateRoute;