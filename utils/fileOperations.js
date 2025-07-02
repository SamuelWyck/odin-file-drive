const fs = require("node:fs/promises");
const path = require("node:path");



const uploadDir = path.resolve(process.env.UPLOAD_DIR);


async function loadFile(fileName) {
    const filePath = path.join(uploadDir, fileName);
    const file = await fs.readFile(filePath);
    return file;
};


async function deleteFile(fileName) {
    const filePath = path.join(uploadDir, fileName);
    await fs.unlink(filePath);
};



module.exports = {
    loadFile,
    deleteFile
};