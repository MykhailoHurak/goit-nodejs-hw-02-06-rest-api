const fs = require("fs/promises")
const path = require("path")
const Jimp = require("jimp")
const UserModel = require("../../models/user")

const dirAvatars = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async (req, res) => {
    const {path: uploadTmp, originalname} = req.file
    const {_id} = req.user
    const filename = `${_id}_${originalname}`
    const uploadResult = path.join(dirAvatars, filename)
  
    Jimp.read(uploadTmp)
        .then((image) => {
            return image
                .resize(250, 250) // resize
                .write(uploadResult); // save
        })
        .catch((err) => {
            console.error(err);
        });

    await fs.rename(uploadTmp, uploadResult)

    const avatarURL = path.join("avatars", filename)
    

    await UserModel.findByIdAndUpdate(_id, { avatarURL })

    res.json({
        avatarURL,
    })
}

module.exports = updateAvatar