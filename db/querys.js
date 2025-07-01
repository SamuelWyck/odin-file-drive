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



module.exports = {
    findUniqueUser,
    createUser,
    createFolder
};