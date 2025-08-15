const express = require("express")
require("dotenv").config()
const path = require("path")
const indexRouter = require("./src/routes/index")

const PORT = process.env.PORT

const app = express()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src/views"))

app.use(express.urlencoded({extended: true}))

app.use("/", indexRouter)

app.listen(PORT, () => {
    console.log(`App is running and listening on ${PORT}`)
})