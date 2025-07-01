const asyncHandler = require("express-async-handler");



const userPageGet = asyncHandler(async function(req, res) {
    const filePath = req.params.path;

    return res.render("userPage", {
        docTitle: filePath
    });
});



module.exports = {
    userPageGet
};