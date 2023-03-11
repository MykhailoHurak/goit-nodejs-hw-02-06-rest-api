const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env
const UserModel = require("../../models/user")
const { HttpError } = require("../../helpers")
const { loginSchema } = require("../../schemas")

const login = async (req, res) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
        throw HttpError(400, "Missing required name field")
    }

    const { email, password } = req.body

    const user = await UserModel.findOne({email})
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verify")
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    await UserModel.findByIdAndUpdate(user._id, {token})

    res.json({
        token,
    })
}

module.exports = login