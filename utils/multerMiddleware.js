const multer = require("multer");
const db = require("../db/querys.js");
const addExtension = require("../utils/addFileExtension.js");



function getUniqueName(fileName) {
    const uniqueSuffix = Date.now();
    const nameParts = fileName.split(".");
    const endNameIndex = (nameParts.length <= 2) ? 0 : nameParts.length - 2;
    nameParts[endNameIndex] += uniqueSuffix;
    fileName = nameParts.join(".");
    return fileName;
};


const storage = multer.diskStorage({
    destination: process.env.UPLOAD_DIR,
    filename: async function(req, file, cb) { 
        let fileName = addExtension(file.originalname);

        const foundFile = await db.findUniqueFile({
            where: {
                url_name_ownerId: {
                    name: fileName,
                    url: req.body.folderUrl,
                    ownerId: req.user.id
                }
            }
        });

        if (foundFile) {
            fileName = getUniqueName(fileName);
        }

        file.finalName = fileName;
        cb(null, fileName);
    }
});


const upload = multer({storage: storage});



module.exports = upload;