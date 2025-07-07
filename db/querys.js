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


async function findUniqueFile(options) {
    const file = await prisma.file.findUnique(options);
    return file;
};


async function createFile(options) {
    await prisma.file.create(options);
};


async function deleteFile(options) {
    await prisma.file.delete(options);
};


async function deleteFolder(options) {
    await prisma.folder.delete(options);
};


async function updateFile(options) {
    await prisma.file.update(options);
};



module.exports = {
    findUniqueUser,
    createUser,
    createFolder,
    findUniqueFolder,
    findUniqueFile,
    createFile,
    deleteFile,
    deleteFolder,
    updateFile
};