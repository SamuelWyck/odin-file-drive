const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");
const {format} = require("date-fns");
const sysPath = require("node:path");
const formatUrl = require("../utils/formatUrl.js");



const userPageGet = asyncHandler(async function(req, res, next) {
    const path = req.params.path;
    const contentName = req.params.contentName;
    const isDir = req.params.isDir;
    if (!isDir) {
        return next();
    }

    const folder = await db.findUniqueFolder({
        where: {
            url_name_ownerId: {
                url: path,
                name: contentName,
                ownerId: req.user.id
            }
        },
        include: {
            folders: true,
            files: true
        }
    });

    const errors = req.session.errors;
    if (req.session.errors) {
        delete req.session.errors;
    }


    return res.render("folderPage", {
        docTitle: req.params.contentName,
        folderTitle: folder.name,
        folderId: folder.id,
        folderUrl: sysPath.join(path, contentName),
        folders: folder.folders,
        files: folder.files,
        format: format,
        formatStr: "MM/dd/yyyy",
        errors: errors,
        showFolderModal: (errors) ? true : false,
        formatUrl: formatUrl
    });
});



module.exports = {
    userPageGet
};