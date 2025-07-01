function addUserToRes(req, res, next) {
    res.locals.user = req.user;
    return next();
};



module.exports = addUserToRes;