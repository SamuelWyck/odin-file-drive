function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/auth/login");
};


function isNotLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }

    return next();
};



module.exports = {
    isLoggedIn,
    isNotLoggedIn
};
