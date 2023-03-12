const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")

const UserModel = require("../../models/user")
const { HttpError, sendEmail } = require("../../helpers")
const { registerSchema } = require("../../schemas")
const { BASE_URL } = process.env

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

    const verificationToken = nanoid()

    const newUser = await UserModel.create({ ...req.body, password: passwordHash, avatarURL, verificationToken })
    
    const verifyEmail = {
        to: email,
        subject: "Verify your Email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your Email</a>`
    }

    await sendEmail(verifyEmail)

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

module.exports = register