const db = require("../db/queries")


async function getHomepage(req, res) {
    const data = await db.getGamesInfo()

    res.render("pages/index", {title: "Homepage", data: data})
}

function getAddGame(req, res) {

    res.render("pages/add-game", {title: "Add Game"})
}

function getGenres(req, res) {
    res.render("pages/browse-genres", {title: "Browse Genres"})
}


module.exports = {getHomepage, getAddGame, getGenres}