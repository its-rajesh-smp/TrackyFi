const router = require("express").Router()
const paymentController = require("../controllers/payment")

router.post("/payment/create", paymentController.create)
router.post("/payment/capture", paymentController.capture)
router.patch("/payment/failed", paymentController.failed)




module.exports = router