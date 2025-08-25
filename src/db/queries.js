const pool = require("./pool")


async function insertGameInfo(gameTitle, developerName, imageUrl, genres) {

    const insertDeveloperNameQuery = `INSERT INTO developers (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING;`

    const insertGameInfoQuery = `INSERT INTO games (title, developer_id, image_url)
    VALUES ($1, (SELECT id FROM developers WHERE name = $2), $3);`

    const updateJunctionTable = `INSERT INTO game_genres (game_id, genre_id)
    SELECT (SELECT id FROM games WHERE title = $1), unnest(ARRAY(SELECT id FROM genres WHERE name in ANY($2)));`

    const client = await pool.connect()

    try {
        await client.query("BEGIN;")
        await client.query(insertDeveloperNameQuery, [developerName])
        await client.query(insertGameInfoQuery, [gameTitle, developerName, imageUrl])
        await client.query(updateJunctionTable, [gameTitle, genres])
        await client.query("COMMIT;")
    }

    catch(err) {
        await client.query("ROLLBACK;")
        throw err
    }
    
    finally {
        client.release()
    }
}

async function getGamesInfo() {

    const query = `SELECT id, title, image_url FROM games;`

    const result = await pool.query(query)
    return result.rows
}


async function getGenresFromDatabase() {

    const query = `SELECT * FROM genres;`
    
    const result = await pool.query(query)
    return result.rows
}


async function getIndividualGameInfo(id) {

    const query = `SELECT games.title, games.image_url, developers.name, ARRAY_AGG(genres.name) AS genre_names FROM games
    JOIN developers ON games.developer_id = developers.id
    JOIN game_genres ON games.id = game_genres.game_id
    JOIN genres ON game_genres.genre_id = genres.id
    WHERE games.id = ($1)
    GROUP BY games.id, games.title, games.image_url, developers.name;`

    const result = await pool.query(query, [id])
    return result.rows[0] || null
}


async function getGamesForGenre(id) {
    
    const query = `SELECT games.id, games.title, games.image_url, genres.name FROM games
    JOIN game_genres ON games.id = game_genres.game_id
    JOIN genres ON game_genres.genre_id = genres.id
    WHERE genres.id = ($1);`

    const result = await pool.query(query, [id])
    return result.rows
}

module.exports = {insertGameInfo, getGamesInfo, getGenresFromDatabase, getIndividualGameInfo, getGamesForGenre}