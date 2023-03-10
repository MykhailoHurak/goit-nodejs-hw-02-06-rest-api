const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const UserModel = require("../../models/user")
const { HttpError } = require("../../helpers")
const { registerSchema } = require("../../schemas")

const register = async (req, res) => {
    const { error } = registerSchema.validate(req.body)
    if (error) {
        throw HttpError(400, "Missing required name field")
    }

    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const avatarURL = gravatar.url(email)

    const newUser = await UserModel.create({...req.body, password: passwordHash, avatarURL})

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })

}

module.exports = register