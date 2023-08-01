const User = require("../models/user")
const bcrypt = require("bcrypt")
const saltRound = 10

exports.create = async (req, res) => {
    try {
        const { email, password } = req.body

        const hash = await bcrypt.hash(password, saltRound)

        const dbRes = await User.create({ email, password: hash })

        res.send({ error: false, body: dbRes.dataValues })
    } catch (error) {
        console.log(error);
        res.send({ error: error.original.sqlMessage, body: null })
    }
}



exports.get = async (req, res) => {
    try {
        const { email, password } = req.body
        const dbRes = await User.findOne({ where: { email: email } })

        if (dbRes === null) {
            res.send({ error: "User Not Found", body: null })
            return;
        }

        const comparesionRes = await bcrypt.compare(password, dbRes.password)
        if (!comparesionRes) {
            res.send({ error: "Password Not Matched", body: null })
            return;
        }


        res.send({ error: false, body: dbRes.dataValues })
    } catch (error) {
        console.log(error);
        res.send({ error: error.original.sqlMessage, body: null })
    }
}