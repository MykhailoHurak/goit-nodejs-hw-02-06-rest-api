const express = require("express")

const { register, login, current, logout } = require("../../controllers/auth")
const { authenticate } = require("../../middlewares")
const { ctrlWrapper } = require("../../helpers")

const router = express.Router()

router.post('/register', ctrlWrapper(register))

router.post('/login', ctrlWrapper(login))

router.get('/current', authenticate, ctrlWrapper(current))

router.post('/logout', authenticate, ctrlWrapper(logout))

module.exports = router