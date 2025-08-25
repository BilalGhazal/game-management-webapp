const db = require("../db/queries")


async function getIndividualGamePage(req, res) {
    const id = req.params.id
    const data = await db.getIndividualGameInfo(id)   

    if (data) {
        res.render("pages/individual-game-page", {title: data.title, data: data})
    }

    else {
        res.render("pages/error-page", {title: "Error"})
    }  
}


async function getGamesInfoForGenre(req, res) {

    const id = Number(req.params.slug.split("-").pop())
    
    if (isNaN(id)) {
        return res.render("pages/error-page", {title: "Error", message: "Invalid game ID"})
    }

    const data = await db.getGamesForGenre(id)

    if (data.length > 0) {
        res.render("pages/games-of-genre", {title: data[0].name, data: data})
    }

    else {
        res.render("pages/error-page", {title: "Error", message: "No games found for this genre"})
    }
}


module.exports = {getIndividualGamePage}