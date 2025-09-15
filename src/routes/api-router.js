const express = require("express")
const router = express.Router()
const {fetchGamePosters, checkPassword, deleteGameFromDatabase} = require("../controllers/game-controller")


router.get("/search/:gameTitle", fetchGamePosters)

router.post("/delete/game/checkpassword", checkPassword)

router.delete("/delete/game/:id", deleteGameFromDatabase)


module.exports = router