const User = require("../models/user")
const Category = require("../models/category")
const Transection = require("../models/transection")
const Payment = require("../models/payment")
module.exports = () => {
    User.hasMany(Category, { as: "categories", foreignKey: "email", onDelete: "CASCADE" })
    User.hasMany(Transection, { as: "transections", foreignKey: "email", onDelete: "CASCADE" })
    Transection.belongsTo(Category, { as: "category", foreignKey: "categoryId", onDelete: "CASCADE" })


    Payment.belongsTo(User, { foreignKey: "email", onDelete: "CASCADE" })
    User.hasMany(Payment, { foreignKey: "email", onDelete: "CASCADE" })
}