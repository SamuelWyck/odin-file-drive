const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");
const {renameFileValidator} = require("../utils/validators.js");
const {validationResult} = require("express-validator");
const removeFirstDirFromPath = require("../utils/removeFirstDirFromPath.js");
const supabase = require("../utils/supabaseConfig.js");
const path = require("node:path");



const fileUpdateGet = asyncHandler(async function(req, res, next) {
    const redirect = removeFirstDirFromPath(req.body.fileUrl);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.errors = errors.array();
        req.session.fileDetails = {
            fileName: req.body.fileName,
            fileOriginalName: req.body.fileOriginalName,
            fileDate: req.body.fileDate,
            fileUrl: req.body.fileUrl,
            fileNameData: req.body.fileOriginalName,
            fileDownloadLink: `/download?path=${req.body.fileUrl}&name=${req.body.fileOriginalName}`
        };
        return res.redirect(`/${redirect}`);
    }


    const {data, error} = await supabase.storage
    .from(process.env.SUPA_BUCKET)
    .move(
        path.join(req.body.fileUrl, req.body.fileOriginalName),
        path.join(req.body.fileUrl, req.body.fileName)
    );

    if (error) {
        return next(error);
    }

    await db.updateFile({
        where: {
            url_name_ownerId: {
                name: req.body.fileOriginalName,
                url: req.body.fileUrl,
                ownerId: req.user.id
            }
        },
        data: {
            name: req.body.fileName
        }
    });
    

    return res.redirect(`/${redirect}`);
});



module.exports = {
    fileUpdateGet: [
        renameFileValidator,
        fileUpdateGet
    ]
};