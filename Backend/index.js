const express = require("express")
const body_parser = require("body-parser")
const cors = require("cors")
const sequelize = require("./utils/database")

// Routes
const user = require("./routes/user")
const category = require("./routes/category")
const app = express()

// Relation
const relations = require("./relations/relations")()

// Middlewires
app.use(body_parser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())

app.use(user)
app.use(category)



// SERVER AND APP STARTS FROM HERE
sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log("APP IS LISTENING");
    })
}).catch((error) => {
    console.log(error);
})





