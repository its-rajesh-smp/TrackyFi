const Payment = require("../models/payment")
const jwt = require("../utils/jwt")
const credentials = require("../credentials")
const User = require("../models/user")
const Rozorpay = require("razorpay")



exports.create = async (req, res) => {
    try {
        const { idToken } = req.body

        // Decreapting Email,password from jwt
        const { email } = jwt.verify(idToken);

        // Creating new rozorpay instance
        const rzp = new Rozorpay({
            key_id: credentials.KEY_ID,
            key_secret: credentials.KEY_SECRET
        })

        // Creating A Order
        const { id: orderId } = await rzp.orders.create({ amount: credentials.VIP_AMOUT, currency: "INR" })

        // Storing In Database
        const dbRes = Payment.create({ orderId, email })

        // Generating Payload
        const payload = {
            orderId,
            key_id: credentials.KEY_ID,
        }

        res.send({ error: false, body: payload });

    } catch (error) {
        console.log(error);
        res.send({ error: error.message, body: null });
    }
}




exports.capture = async (req, res) => {
    try {
        const { idToken, orderId, paymentId } = req.body

        // Decreapting Email,password from jwt
        const { email } = jwt.verify(idToken);

        // Updating The VIP in user
        const userRes = await User.update({ VIP: true }, {
            where: { email: email }
        })

        const paymentRes = await Payment.update({ status: "SUCCESS", paymentId: paymentId }, { where: { orderId: orderId } })
        res.send({ error: false, body: { VIP: true } });

        Payment.destroy({ where: { status: "PENDING", email: email } })



    } catch (error) {
        console.log(error);
        res.send({ error: error.message, body: null });
    }
}




exports.failed = async (req, res) => {
    try {
        const { orderId } = req.body
        await Payment.update({ status: "FAILED" }, { where: { orderId: orderId } })
        res.send({ error: 'PAYMENT FAILED', body: null });
    } catch (error) {
        console.log(error);
        res.send({ error: error.message, body: null });
    }
}