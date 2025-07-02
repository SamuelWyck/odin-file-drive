const multer = require("multer");
const db = require("../db/querys.js");



function getUniqueName(fileName) {
    const uniqueSuffix = Date.now();
    const nameParts = fileName.split(".");
    const endNameIndex = (nameParts.length <= 2) ? 0 : nameParts.length - 2;
    nameParts[endNameIndex] += uniqueSuffix;
    fileName = nameParts.join(".");
    return fileName;
};


function addExtension(fileName) {
    const extensionStartIndex = fileName.indexOf(".");
    if (extensionStartIndex === -1) {
        fileName += ".file";
    }
    return fileName;
};


const storage = multer.diskStorage({
    destination: process.env.UPLOAD_DIR,
    filename: async function(req, file, cb) { 
        const foundFile = await db.findUniqueFile({
            where: {
                url_name_ownerId: {
                    name: file.originalname,
                    url: req.body.folderUrl,
                    ownerId: req.user.id
                }
            }
        });

        let fileName = addExtension(file.originalname);
        if (foundFile) {
            fileName = getUniqueName(fileName);
        }

        file.finalName = fileName;
        cb(null, fileName);
    }
});


const upload = multer({storage: storage});



module.exports = upload;