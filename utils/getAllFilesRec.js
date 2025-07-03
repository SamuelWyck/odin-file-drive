const path = require("node:path");
const db = require("../db/querys.js");



async function getAllFiles(folderPath, folderName, userId) {
    const files = [];
    await getAllFilesRec(folderPath, folderName, userId, files);
    return files;
};


async function getAllFilesRec(folderPath, folderName, userId, files) {
    const folder = await db.findUniqueFolder({
        where: {
            url_name_ownerId: {
                url: folderPath,
                name: folderName,
                ownerId: userId
            }
        },
        include: {
            files: true,
            folders: true
        }
    });

    for (let file of folder.files) {
        const filePath = path.join(file.url, file.name);
        files.push(filePath);
    }

    for (let subFolder of folder.folders) {
        await getAllFilesRec(subFolder.url, subFolder.name, userId, files);
    }
};



module.exports = getAllFiles;