const User = require("../models/user")

exports.create = async (req, res) => {
    try {
        const { email, password } = req.body
        const dbRes = await User.create({ email, password })
        res.send({ error: false, body: dbRes.dataValues })
    } catch (error) {
        console.log(error);
        res.send({ error: error.original.sqlMessage, body: null })
    }
}



exports.get = async (req, res) => {
    try {
        const { email, password } = req.body
        const dbRes = await User.findOne({
            where: {
                email: email, password: password
            }
        })

        if (dbRes === null) {
            res.send({ error: "User Not Found", body: null })
            return;
        }

        res.send({ error: false, body: dbRes.dataValues })
    } catch (error) {
        console.log(error);
        res.send({ error: error.original.sqlMessage, body: null })
    }
}