const {PrismaClient} = require("../generated/prisma");



const prisma = new PrismaClient();


async function findUniqueUser(options) {
    const user = await prisma.user.findUnique(options);
    return user;
};


async function createUser(options) {
    await prisma.user.create(options);
};


async function createFolder(options) {
    await prisma.folder.create(options);
};


async function findUniqueFolder(options) {
    const folder = await prisma.folder.findUnique(options);
    return folder;
};



module.exports = {
    findUniqueUser,
    createUser,
    createFolder,
    findUniqueFolder
};