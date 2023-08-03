const sequelize = require("../utils/database")
const Sequelize = require('sequelize')


const User = sequelize.define("user", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    VIP: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = User