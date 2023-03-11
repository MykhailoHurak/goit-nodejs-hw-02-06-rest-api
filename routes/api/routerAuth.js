const express = require("express")

const { register, verify, resendVerifyEmail, login, current, logout, updateAvatar } = require("../../controllers/auth")
const { authenticate, upload } = require("../../middlewares")
const { ctrlWrapper } = require("../../helpers")

const router = express.Router()

router.post('/register', ctrlWrapper(register))

router.get('/verify/:verificationToken', ctrlWrapper(verify))

router.post('/verify', ctrlWrapper(resendVerifyEmail))

router.post('/login', ctrlWrapper(login))

router.get('/current', authenticate, ctrlWrapper(current))

router.post('/logout', authenticate, ctrlWrapper(logout))

router.patch('/avatars', authenticate, upload.single("avatar"), ctrlWrapper(updateAvatar))

module.exports = router