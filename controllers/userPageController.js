const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");
const {format} = require("date-fns");
const sysPath = require("node:path");
const formatUrl = require("../utils/formatUrl.js");
const getPathLinks = require("../utils/getPathLinks.js");



const folderPageGet = asyncHandler(async function(req, res, next) {
    const path = req.params.path;
    const contentName = req.params.contentName;

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

    if ((!folder)) {
        return next(new Error("Folder not found"));
    }


    const pathLinks = getPathLinks(
        sysPath.join(path, contentName),
        req.user.username
    );


    const errors = req.session.errors;
    if (req.session.errors) {
        delete req.session.errors;
    }
    const fileDetails = req.session.fileDetails;
    if (req.session.fileDetails) {
        delete req.session.fileDetails;
    }

    const showFolderModal = (errors && !fileDetails) ? true : false;
    const showFileModal = (errors && fileDetails) ? true : false;


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
        fileDetails: fileDetails,
        showFolderModal: showFolderModal,
        showFileModal: showFileModal,
        formatUrl: formatUrl,
        pathLinks: pathLinks
    });
});



module.exports = {
    folderPageGet: [
        folderPageGet,
    ]
};