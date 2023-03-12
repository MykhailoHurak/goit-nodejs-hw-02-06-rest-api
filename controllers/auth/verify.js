const UserModel = require("../../models/user")
const { HttpError } = require("../../helpers")

const verify = async (req, res) => {
    const { verificationToken } = req.params
    const user = UserModel.findOne({ verificationToken })
    if (!user) {
        throw HttpError(404)
    }
    await UserModel.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" })
    
    res.json({
        message: "Email verify success"
    })
}

module.exports = verify