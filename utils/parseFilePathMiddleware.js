function isDir(contentName) {
    return !/\.\w+$/.test(contentName);
};


function buildReqParams(req, path, contentName, isDir) {
    req.params.path = path;
    req.params.contentName = contentName;
    req.params.isDir = isDir;
};


function parseFilePath(req, res, next) {
    if (!req.params.path) {
        buildReqParams(req, "", req.user.username, true);
        return next();
    }

    if (req.params.path.length === 1) {
        const contentName = req.params.path[0];
        buildReqParams(
            req, 
            req.user.username, 
            contentName, 
            isDir(contentName)
        );
        return next();
    }


    const pathParts = req.params.path;
    let path = [req.user.username, "/"];

    for (let i = 0; i < pathParts.length - 1; i += 1) {
        const part = pathParts[i];
        path.push(part);
        path.push("/");
    }
    path.pop();

    path = path.join("");
    const contentName = pathParts[pathParts.length - 1];
    buildReqParams(req, path, contentName, isDir(contentName));
    return next();
};



module.exports = parseFilePath;