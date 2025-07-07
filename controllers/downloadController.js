const asyncHandler = require("express-async-handler");
const supabase = require("../utils/supabaseConfig.js");
const db = require("../db/querys.js");
const path = require("node:path");



const downloadFileGet = asyncHandler(async function(req, res, next) {
    const filePath = req.query.path;
    const fileName = req.query.name;


    const file = await db.findUniqueFile({
        where: {
            url_name_ownerId: {
                url: filePath,
                name: fileName,
                ownerId: req.user.id
            }
        }
    });

    if (!file) {
        throw new Error("File not found");
    }

    const {data, error} = await supabase.storage
    .from(process.env.SUPA_BUCKET)
    .createSignedUrl(
        path.join(filePath, fileName),
        120,
        {download: true}
    );

    if (error) {
        return next(error);
    }


    return res.json(data.signedUrl);
});



module.exports = {
    downloadFileGet
};