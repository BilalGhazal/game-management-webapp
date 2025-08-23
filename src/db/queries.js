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
    const query = `SELECT name FROM genres;`
    
    const result = await pool.query(query)
    return result.rows
}


module.exports = {insertGameInfo, getGamesInfo, getGenresFromDatabase}