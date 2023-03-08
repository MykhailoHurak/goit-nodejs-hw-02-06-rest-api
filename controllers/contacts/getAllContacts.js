const ContactModel = require("../../models/contact")

const getAllContacts = async (req, res) => { 
        const { _id: owner } = req.user
        const result = await ContactModel.find({ owner })
        .populate("owner", "_id email subscription")
        res.json(result)
}

module.exports = getAllContacts