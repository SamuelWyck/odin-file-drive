const asyncHandler = require("express-async-handler");



const userPageGet = asyncHandler(async function(req, res) {
    console.log(req.params.path);
    console.log(req.params.contentName);
    console.log(req.params.isDir);

    return res.render("userPage", {
        docTitle: req.params.contentName
    });
});



module.exports = {
    userPageGet
};