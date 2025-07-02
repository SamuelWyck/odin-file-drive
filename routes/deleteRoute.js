const {Router} = require("express");
const deleteController = require("../controllers/deleteController.js");
const {isLoggedIn} = require("../utils/authMiddleware.js");


const deleteRoute = Router();


deleteRoute.post("/file", isLoggedIn, deleteController.deleteFilePost);



module.exports = deleteRoute;