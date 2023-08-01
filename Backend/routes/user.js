const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

router.post('/user/signup', userController.signup)
router.post('/user/signin', userController.signin)



module.exports = router