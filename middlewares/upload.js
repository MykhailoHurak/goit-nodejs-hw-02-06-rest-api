const multer = require("multer")
const path = require("path")

const dirTmp = path.join(__dirname, "../", "tmp")

const multerConfig = multer.diskStorage({
    destination: dirTmp,
})

const upload = multer({
    storage: multerConfig,
})

module.exports = upload