const Category = require("../models/category")


exports.add = async (req, res) => {
    try {
        const { email, name } = req.body
        // Adding In Database
        const dbRes = await Category.create({ email, name })
        res.send({ error: false, body: { id: dbRes.id, name: dbRes.name } });
    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
}


exports.delete = async (req, res) => {
    try {
        const { id } = req.body
        // Removing From Database
        const dbRes = await Category.destroy({ where: { id: id } })
        res.send({ error: false, body: dbRes });
    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
}



