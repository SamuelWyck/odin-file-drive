const asyncHandler = require("express-async-handler");
const upload = require("../utils/multerMiddleware.js");
const db = require("../db/querys.js");
const supabase = require("../utils/supabaseConfig.js");
const {loadFile, deleteFile} = require("../utils/fileOperations.js");
const path = require("node:path");



const uploadFilePost = asyncHandler(async function(req, res, next) {
    const fileName = req.file.finalName;

    const file = await loadFile(fileName);

    const [undefined, supa] = await Promise.all([
        deleteFile(fileName),
        supabase.storage
        .from(process.env.SUPA_BUCKET)
        .upload(
            path.join(req.body.folderUrl, fileName),
            file
        )
    ]);

    if (supa.error) {
        return next(supa.error);
    }
        
    await db.createFile({
        data: {
            name: fileName,
            url: req.body.folderUrl,
            sizeKB: req.file.size / 1000,
            ownerId: req.user.id,
            folderId: req.body.folderId
        }
    });


    let redirect = "/";
    const folderUrl = req.body.folderUrl;
    const firstSlashIndex = folderUrl.indexOf("/");
    redirect = (firstSlashIndex !== -1) ? 
        `${folderUrl.slice(firstSlashIndex)}` : redirect;

    return res.redirect(redirect);
});



module.exports = {
    uploadFilePost: [
        upload.single("file"),
        uploadFilePost
    ]
};