const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");



const deleteFilePost = asyncHandler(async function(req, res) {
    console.log(req.body)
});



module.exports = {
    deleteFilePost
};