const db = require("../db/queries")


async function getIndividualGamePage(req, res) {
    const data = await db.getIndividualGameInfo()

    res.render("pages/individal-game-page", {title: data[0].title, data: data})
}


module.exports = {getIndividualGamePage}