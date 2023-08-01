const User = require("../models/user");
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
        const dbRes = await User.findOne({ where: { email: email } });

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
        const dbRes = await User.findOne({ where: { email: email } });

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
        console.log(email, updateFields);
        const dbRes = await User.update(updateFields, {
            where: { email: email }
        })

        console.log(dbRes);

        res.send({ error: "User Not Found", body: null });

    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message, body: null });
    }
}