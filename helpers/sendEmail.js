const sendgridMail = require("@sendgrid/mail")
require("dotenv").config()

const { SENDGRID_API_KEY } = process.env

sendgridMail.setApiKey(SENDGRID_API_KEY)

const sendEmail = async (data) => {
    const email = { ...data, from: "mykhailohurak@gmail.com" }
    await sendgridMail.send(email)
    return true
}

module.exports = sendEmail
