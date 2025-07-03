const asyncHandler = require("express-async-handler");
const upload = require("../utils/multerMiddleware.js");
const db = require("../db/querys.js");
const supabase = require("../utils/supabaseConfig.js");
const {loadFile, deleteFile} = require("../utils/fileOperations.js");
const path = require("node:path");
const removeFirstDirFromPath = require("../utils/removeFirstDirFromPath.js");
const {createFolderValidator} = require("../utils/validators.js");
const {validationResult} = require("express-validator");



const uploadFilePost = asyncHandler(async function(req, res, next) {
    const fileName = req.file.finalName;
    const filePath = path.join(req.body.folderUrl, fileName); 

    const file = await loadFile(fileName);

    const [undefined, supa] = await Promise.all([
        deleteFile(fileName),
        supabase.storage
        .from(process.env.SUPA_BUCKET)
        .upload(filePath, file)
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


    const redirect = removeFirstDirFromPath(req.body.folderUrl);
    return res.redirect(`/${redirect}`);
});


const uploadFolderPost = asyncHandler(async function(req, res) {
    const redirect = removeFirstDirFromPath(req.body.parentUrl);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.errors = errors.array();
        return res.redirect(`/${redirect}`);
    }

    await db.createFolder({
        data: {
            name: req.body.folderName.trim(),
            url: req.body.parentUrl,
            parentId: req.body.parentId,
            ownerId: req.user.id
        }
    });

    return res.redirect(`/${redirect}`);
});



module.exports = {
    uploadFilePost: [
        upload.single("file"),
        uploadFilePost
    ],
    uploadFolderPost: [
        createFolderValidator,
        uploadFolderPost
    ]
};