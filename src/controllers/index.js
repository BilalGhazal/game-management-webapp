const db = require("../db/queries")


async function getHomepage(req, res) {
    const data = await db.getGamesInfo()

    res.render("index", {title: "Homepage", data: data})
}

function getAddGame(req, res) {

    res.render("add-game", {title: "Add Game"})
}


module.exports = {getHomepage, getAddGame}