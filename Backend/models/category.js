const Sequelize = require("sequelize")
const sequelize = require("../utils/database")



const Category = sequelize.define("category", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING
    }
})

module.exports = Category