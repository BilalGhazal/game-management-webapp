const express = require("express")
const router = express.Router()
const indexController = require("../controllers/index-controller")
const gameController = require("../controllers/game-controller")


router.get("/", indexController.getHomepage)

router.get("/add-game", indexController.getAddGame)

router.get("/browse-genres", indexController.getGenres)

router.get("/game/:id", gameController.getIndividualGamePage)


module.exports = router