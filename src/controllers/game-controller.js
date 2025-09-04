const db = require("../db/queries")
const slugify = require("slugify")


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


async function fetchGamePosters(req, res) {
    const slug = slugify(req.params.gameTitle)
    const url = `https://api.rawg.io/api/games?key=${process.env.APIKEY}&search=${slug}`

    try {
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
            
        }

        const gameData = await response.json()
        const numberOfImages = gameData.results.length >= 10 ? 10 : gameData.results.length
        const gameDataResults = gameData.results.splice(0, numberOfImages)
        console.log(gameDataResults)
        const gamePosters = gameDataResults.map((game) => game.background_image)

        res.json(gamePosters)
    } 
    
    catch (err) {
        console.log(err.message)
    }
}


module.exports = {getIndividualGamePage, getGamesInfoForGenre, fetchGamePosters}