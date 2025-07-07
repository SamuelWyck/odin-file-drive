const removeFirstDirFromPath = require("./removeFirstDirFromPath");



function getPathLinks(folderPath, username) {
    folderPath = removeFirstDirFromPath(folderPath);
    const folders = folderPath.split("/");
    const pathLinks = [{
        text: username,
        url: "/"
    }];

    if (folders[0] === "") {
        return pathLinks;
    }

    for (let i = 0; i < folders.length; i += 1) {
        const folder = folders[i];

        const link = {
            text: folder,
            url: `/${folders.slice(0, i + 1).join("/")}`
        };
        
        pathLinks.push(link);
    }

    return pathLinks;
};



module.exports = getPathLinks;