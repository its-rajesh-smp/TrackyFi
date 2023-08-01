const jwt = require("jsonwebtoken")
const credentials = require("../credentials")

exports.encrept = (data) => {
    return jwt.sign(data, credentials.password)
}



exports.decrept = (token) => {
    return jwt.decode(token)
}




exports.verify = (data) => {
    return jwt.verify(data, credentials.password)
}