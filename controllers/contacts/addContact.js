const ContactModel = require("../../models/contact")
const { HttpError } = require("../../helpers")
const { addSchema } = require("../../schemas")



const addContact = async (req, res) => {
    const { error } = addSchema.validate(req.body)
    if (error) {
        throw HttpError(400, "Missing required name field")
    }
    
    const { _id: owner } = req.user
    const result = ContactModel.create({ ...req.body, owner })
    console.log("Added new contact")
    console.log("result: ", result)
    
    res.status(201).json(result)
}

module.exports = addContact