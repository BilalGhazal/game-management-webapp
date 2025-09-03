const express = require("express")
const router = express.Router()
const {fetchGamePosters} = require("../controllers/game-controller")


router.get("/search/:gameTitle", fetchGamePosters)


module.exports = router