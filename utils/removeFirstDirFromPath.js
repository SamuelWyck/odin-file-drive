function removeFirstDirFromPath(path) {
    let redirect = "";
    
    const firstSlashIndex = path.indexOf("/");

    if (firstSlashIndex !== -1) {
        redirect = path.slice(firstSlashIndex + 1);
    }

    return redirect;
};



module.exports = removeFirstDirFromPath;