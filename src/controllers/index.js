const db = require("../db/queries")


async function getHomepage(req, res) {
    const data = await db.getGamesInfo()

    res.render("index", {title: "Homepage", data: data})
}

module.exports = {getHomepage}