const express = require("express")
const router = express.Router()
const indexController = require("../controllers/index")

router.get("/", indexController.getHomepage)

router.get("/add-game", indexController.getAddGame)

router.get("/browse-genres", indexController.getGenres)


module.exports = router