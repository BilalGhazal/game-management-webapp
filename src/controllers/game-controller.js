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


module.exports = {getIndividualGamePage}