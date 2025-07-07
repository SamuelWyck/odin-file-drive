const {Router} = require("express");
const downloadController = require("../controllers/downloadController.js");
const {isLoggedIn} = require("../utils/authMiddleware.js");



const downloadRoute = Router();


downloadRoute.get("/", isLoggedIn, downloadController.downloadFileGet);



module.exports = downloadRoute;