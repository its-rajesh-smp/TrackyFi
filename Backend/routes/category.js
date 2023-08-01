
const categoryController = require("../controllers/category")
const router = require('express').Router()


router.post("/category/add", categoryController.add)
router.post("/category/delete", categoryController.delete)


module.exports = router