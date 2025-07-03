const removeFirstDirFromPath = require("../utils/removeFirstDirFromPath");



function formatUrl(url) {
    url = removeFirstDirFromPath(url);
    url = (url === "") ? url : "/" + url;
    return url;
};



module.exports = formatUrl;