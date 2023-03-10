const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    avatarURL: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
}, {versionKey: false, timestamps: true})

const UserModel = model("user", userSchema)

module.exports = UserModel