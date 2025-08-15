const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("It is working!!!")
    console.log("Server is up!")
})

module.exports = router