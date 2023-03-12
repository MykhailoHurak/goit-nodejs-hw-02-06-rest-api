const UserModel = require("../../models/user")

const { HttpError, sendEmail } = require("../../helpers")
const { emailSchema } = require("../../schemas")

const { BASE_URL } = process.env

const resendVerifyEmail = async (req, res) => {
    const { error } = emailSchema.validate(req.body)
    if (error) {
        throw HttpError(400, "Missing required field email")
    }

    const { email } = req.body
    const user = await UserModel.findOne({ email })
    if (!user || user.verify) {
        throw HttpError(404)
    }

    const verifyEmail = {
        to: email,
        subject: "Verify your Email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your Email</a>`
    }

    await sendEmail(verifyEmail)

    res.json({
        message: "Verify email resend"    })
}

module.exports = resendVerifyEmail