const User = require("../models/user");
const Category = require("../models/category")
const Transections = require("../models/transection")

const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const saltRound = 10;

/* -------------------------------------------------------------------------- */
/*                             CREATE NEW ACCOUNT                             */
/* -------------------------------------------------------------------------- */

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Generate Hash
        const hash = await bcrypt.hash(password, saltRound);

        // Creating User
        const dbRes = await User.create({ email, password: hash });

        // Generate JWT
        const idToken = jwt.encrept({ email, password });

        // Forming Payload
        const payload = {
            email,
            verified: dbRes.dataValues.verified,
            idToken: idToken,
        };

        res.send({ error: false, body: payload });
    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
};


/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Finding User
        const dbRes = await User.findOne({ where: { email: email }, include: [Category, Transections] });

        // If User Not Present
        if (dbRes === null) {
            res.send({ error: "User Not Found", body: null });
            return;
        }

        // Verifying Entered Password With Stored Hash Password
        const comparesionRes = await bcrypt.compare(password, dbRes.password);

        // if hash Not matched
        if (!comparesionRes) {
            res.send({ error: "Password Not Matched", body: null });
            return;
        }

        // Generating JWT
        const idToken = jwt.encrept({ email, password });

        // Forming Payload
        const payload = {
            email,
            verified: dbRes.dataValues.verified,
            idToken: idToken,
            categoryList: dbRes.category_tables,
            transectionList: dbRes.transections
        };

        res.send({ error: false, body: payload });
    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
};


/* -------------------------------------------------------------------------- */
/*                                  GET USER                                  */
/* -------------------------------------------------------------------------- */

exports.getUser = async (req, res) => {
    try {
        const { idToken } = req.body;

        // Decreapting Email,password from jwt
        const { email, password } = jwt.verify(idToken);

        // Finding User
        const dbRes = await User.findOne({
            where: { email: email }, include: [{
                model: Category,
                as: "categories"
            }, {
                model: Transections,
                as: "transections",
                include: [{
                    model: Category,
                    as: "category",
                    attributes: ["name", "id"]
                }],
                attributes: { exclude: ['categoryId'] }
            }]

        });


        // If User Not Found
        if (dbRes === null) {
            res.send({ error: "User Not Found", body: null });
            return;
        }

        // Verifying Entered Password With Stored Hash Password
        const comparesionRes = await bcrypt.compare(password, dbRes.password);

        // if hash Not matched
        if (!comparesionRes) {
            res.send({ error: "Password Not Matched", body: null });
            return;
        }

        // Forming Payload
        const payload = {
            email: dbRes.dataValues.email,
            verified: dbRes.dataValues.verified,
            idToken,
            categories: dbRes.categories,
            transections: dbRes.transections
        };

        res.send({ error: false, body: payload });
    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
};



exports.update = async (req, res) => {
    try {
        const { email, updateFields } = req.body

        // Update reqested Fields In Database 
        const dbRes = await User.update(updateFields, {
            where: { email: email }
        })

        // Sending The Updated Fields To Frontend
        res.send({ error: false, body: updateFields });

    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
}