const {Router} = require("express");
const uploadController = require("../controllers/uploadController.js");
const {isLoggedIn} = require("../utils/authMiddleware.js");


const uploadRoute = Router();


uploadRoute.post("/file", isLoggedIn, uploadController.uploadFilePost);
uploadRoute.post("/folder", isLoggedIn, uploadController.uploadFolderPost);



module.exports = uploadRoute;