const User = require("../models/user")
const Category = require("../models/category")
const Transection = require("../models/transection")
module.exports = () => {
    User.hasMany(Category, { as: "categories", foreignKey: "email", onDelete: "CASCADE" })
    User.hasMany(Transection, { as: "transections", foreignKey: "email", onDelete: "CASCADE" })
    Transection.belongsTo(Category, { as: "category", foreignKey: "categoryId", onDelete: "CASCADE" })
}