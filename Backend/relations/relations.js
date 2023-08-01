const User = require("../models/user")
const Category = require("../models/category")

module.exports = () => {
    User.hasMany(Category, { foreignKey: "email", onDelete: "CASCADE" })
}