const db = require("../db/queries")
const slugify = require("slugify")


async function getHomepage(req, res) {
    const data = await db.getGamesInfo()

    res.render("pages/index", {title: "Homepage", data: data})
}

function getAddGame(req, res) {

    res.render("pages/add-game", {title: "Add Game"})
}

async function getGenres(req, res) {
    const data = await db.getGenresFromDatabase()

    const dataMod = data.map(datum => ({
        ...datum,
        urlName: slugify(datum.name, {lower: true})
    }))

    
    res.render("pages/browse-genres", {title: "Browse Genres", data: dataMod})
}


module.exports = {getHomepage, getAddGame, getGenres}