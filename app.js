const express = require("express")
require("dotenv").config()
const path = require("path")

const PORT = process.env.PORT

const app = express()
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src/views"))

app.get("/", (req, res) => {
    res.send("Server is up!!!")
})

app.listen(PORT, () => {
    console.log(`App is running and listening on ${PORT}`)
})