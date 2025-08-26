const db = require("../db/queries")
const slugify = require("slugify")


async function getHomepage(req, res) {
    const data = await db.getGamesInfo()

    if (data && data.length > 0) {
        res.render("pages/index", {title: "Homepage", data: data})
    }
    else {
        res.status(404).render("pages/error-page", {title: "Error", message: "No Games Found"})
    }
}


function getAddGame(req, res) {

    res.render("pages/add-game", {title: "Add Game", pageJS: "add-game"})
}


async function getGenres(req, res) {
    const data = await db.getGenresFromDatabase()

    const dataMod = data.map(datum => ({
        ...datum,
        urlName: slugify(`${datum.name} ${datum.id}`, {lower: true})
    }))

    
    res.render("pages/browse-genres", {title: "Browse Genres", data: dataMod})
}


module.exports = {getHomepage, getAddGame, getGenres}