function parseFilePath(req, res, next) {
    if (!req.params.path) {
        req.params.path = req.user.username;
        return next();
    }

    const pathParts = req.params.path;
    const path = [
        req.user.username,
        "/"
    ];

    for (let i = 0; i < pathParts.length; i += 1) {
        const part = pathParts[i];
        path.push(part);

        if (i !== pathParts.length - 1) {
            path.push("/");
        }
    }

    req.params.path = path.join("");
    return next();
};



module.exports = parseFilePath;