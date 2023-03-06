const { addSchema } = require("./schemasContacts")
const { registerSchema } = require("./schemasUsers")
const { loginSchema } = require("./schemasUsers")

module.exports = {
    addSchema,
    registerSchema,
    loginSchema,
}