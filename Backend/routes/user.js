const express = require("express")
const router = express.Router()
const userController = require("../controllers/user")

router.post('/user/get', userController.get)
router.post('/user/create', userController.create)



module.exports = router