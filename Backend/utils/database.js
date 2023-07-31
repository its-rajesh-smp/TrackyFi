const Sequelize = require("sequelize").Sequelize
const credentials = require("../credentials")


const sequelize = new Sequelize("trackyfi", "root", credentials.password, { dialect: "mysql", host: "localhost", logging: false })

module.exports = sequelize