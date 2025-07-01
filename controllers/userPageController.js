const asyncHandler = require("express-async-handler");



const userPageGet = asyncHandler(async function(req, res) {
    return res.render("userPage", {
        docTitle: req.user.username
    });
});



module.exports = {
    userPageGet
};