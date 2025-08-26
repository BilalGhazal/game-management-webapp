const db = require("../db/queries")


async function getIndividualGamePage(req, res) {
    const id = req.params.id
    const data = await db.getIndividualGameInfo(id)   

    res.render("pages/individual-game-page", {title: data.title, data: data})
}


async function getGamesInfoForGenre(req, res) {

    const id = Number(req.params.slug.split("-").pop())
    
    if (isNaN(id)) {
        return res.render("pages/error-page", {title: "Error", message: "Invalid Game ID"})
    }

    const data = await db.getGamesForGenre(id)

    if (data.length > 0) {
        res.render("pages/games-for-genre", {title: data[0].name, data: data})
    }

    else {
        res.render("pages/error-page", {title: "Error", message: "No Games Found For This Genre"})
    }
}


module.exports = {getIndividualGamePage, getGamesInfoForGenre}