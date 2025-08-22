const db = require("../db/queries")


async function getHomepage(req, res) {
    const data = await db.getGamesInfo()

    res.render("pages/index", {title: "Homepage", data: data})
}

function getAddGame(req, res) {

    res.render("pages/add-game", {title: "Add Game"})
}

async function getGenres(req, res) {
    const data = await db.getGenresFromDatabase()
    
    res.render("pages/browse-genres", {title: "Browse Genres", data: data})
}


module.exports = {getHomepage, getAddGame, getGenres}