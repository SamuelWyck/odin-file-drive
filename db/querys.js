const prisma = require("../generated/prisma");



async function findUniqueUser(options) {
    const user = await prisma.user.findUnique(options);
    return user;
};



module.exports = {
    findUniqueUser
};