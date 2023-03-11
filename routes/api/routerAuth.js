const express = require("express")

const { register, login, current, logout, updateAvatar } = require("../../controllers/auth")
const { authenticate, upload } = require("../../middlewares")
const { ctrlWrapper } = require("../../helpers")

const router = express.Router()

router.post('/register', ctrlWrapper(register))

router.post('/login', ctrlWrapper(login))

router.get('/current', authenticate, ctrlWrapper(current))

router.post('/logout', authenticate, ctrlWrapper(logout))

router.patch('/avatars', authenticate, upload.single("avatar"), ctrlWrapper(updateAvatar))

module.exports = router