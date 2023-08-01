const jwt = require("jsonwebtoken")
const credentials = require("../credentials")

exports.encrept = (data) => {
    return jwt.sign(data, credentials.password)
}



exports.decrept = (token) => {
    return jwt.verify(token, credentials.password)
}