const Transections = require("../models/transection")
const Category = require("../models/category")


exports.add = async (req, res) => {
    try {
        const { categoryId, date, time, price, type, name, email } = req.body
        const dbRes = await Transections.create({ categoryId, date, time, price, type, name, email }, {
            include: [{
                model: Category,
                as: 'category',
                attributes: ['name']
            }]
        })

        const categoryRes = await Category.findByPk(categoryId)

        const payload = {
            id: dbRes.id,
            category: { name: categoryRes.name },
            categoryId, date, time, price, type, name
        }

        res.send({ error: false, body: payload });


    } catch (error) {
        console.log(error);
        res.send({ error: error.message, body: null });
    }
}



exports.edit = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
}



exports.delete = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
}