const { STRING } = require("sequelize")
const sequelize = require("../utils/database")


const Payment = sequelize.define("payment", {
    orderId: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
    },
    paymentId: {
        type: STRING,
        allowNull: true
    },
    status: {
        type: STRING,
        defaultValue: "PENDING"
    }
})


module.exports = Payment