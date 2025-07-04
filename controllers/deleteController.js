const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");
const supabase = require("../utils/supabaseConfig.js");
const path = require("node:path");
const removeFirstDirFromPath = require("../utils/removeFirstDirFromPath.js");
const getAllFiles = require("../utils/getAllFilesRec.js");



const deleteFilePost = asyncHandler(async function(req, res, next) {
    const filePath = path.join(req.body.url, req.body.name);

    const {data, error} = await supabase
    .storage.from(process.env.SUPA_BUCKET)
    .remove([filePath]);
    
    if (error) {
        return next(error);
    }

    await db.deleteFile({
        where: {
            url_name_ownerId: {
                name: req.body.name,
                url: req.body.url,
                ownerId: req.user.id
            }
        }
    });


    const redirect = removeFirstDirFromPath(req.body.url);
    return res.redirect(`/${redirect}`);
});


const deleteFolderPost = asyncHandler(async function(req, res, next) {
    const files = await getAllFiles(
        req.body.url,
        req.body.name,
        req.user.id,
    );

    if (files.length > 0) {
        const {data, error} = await supabase.storage
        .from(process.env.SUPA_BUCKET)
        .remove(files);
    
        if (error) {
            return next(error);
        }
    }

    await db.deleteFolder({
        where: {
            url_name_ownerId: {
                name: req.body.name,
                url: req.body.url,
                ownerId: req.user.id
            }
        }
    });


    const redirect = removeFirstDirFromPath(req.body.url);
    return res.redirect(`/${redirect}`);
});



module.exports = {
    deleteFilePost,
    deleteFolderPost
};