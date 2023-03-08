const express = require('express')

const { isValidId, authenticate } = require("../../middlewares")
const { ctrlWrapper } = require("../../helpers")
const { getAllContacts, getContactById, addContact, removeContact, updateContact, updateContactFavorite } = require("../../controllers/contacts")

const router = express.Router()

router.get('/', authenticate, ctrlWrapper(getAllContacts))

router.get('/:id', authenticate, isValidId, ctrlWrapper(getContactById))

router.post('/', authenticate, ctrlWrapper(addContact))

router.delete('/:id', authenticate, isValidId, ctrlWrapper(removeContact))

router.put('/:id', authenticate, isValidId, ctrlWrapper(updateContact))

router.patch('/:id/favorite', authenticate, isValidId, ctrlWrapper(updateContactFavorite))

module.exports = router
