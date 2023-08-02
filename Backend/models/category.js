const Sequelize = require("sequelize")
const sequelize = require("../utils/database")



const Category = sequelize.define("category_table", {
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
})

module.exports = Category