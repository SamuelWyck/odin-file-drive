const fs = require("node:fs/promises");
const path = require("node:path");



const rootStorageDir = path.resolve(process.env.ROOT_FILE_DIR);


async function createUserDir(username) {
    const userDir = path.join(rootStorageDir, username);
    await fs.mkdir(userDir);
};



module.exports = {
    createUserDir
};