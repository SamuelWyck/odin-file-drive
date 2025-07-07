function addExtension(fileName) {
    const extensionStartIndex = fileName.indexOf(".");
    if (extensionStartIndex === -1) {
        fileName += ".file";
    }
    return fileName;
};



module.exports = addExtension;