const express = require("express")
require("dotenv").config()
const path = require("path")
const indexRouter = require("./src/routes/index-router")
const apiRouter = require("./src/routes/api-router")
const PORT = process.env.PORT || 8080
const app = express()
const expressLayouts = require("express-ejs-layouts")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src/views"))
app.set("layout", "layouts/main")

app.use(expressLayouts)
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/", indexRouter)
app.use("/api", apiRouter)


app.listen(PORT, () => {
    console.log(`App is running and listening on ${PORT}`)
})