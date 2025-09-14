const express = require("express")
const router = express.Router()
const {fetchGamePosters, deleteGameFromDatabase} = require("../controllers/game-controller")


router.get("/search/:gameTitle", fetchGamePosters)

router.delete("/delete/game/:id", deleteGameFromDatabase)


module.exports = router