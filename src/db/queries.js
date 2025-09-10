const pool = require("./pool")


async function insertGameInfo(gameTitle, developerName, imageUrl, genres) {

    const insertDeveloperNameQuery = `INSERT INTO developers (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING;`

    const insertGameInfoQuery = `INSERT INTO games (title, developer_id, image_url)
    VALUES ($1, (SELECT id FROM developers WHERE name = $2), $3) RETURNING id;`

    const updateJunctionTable = `INSERT INTO game_genres (game_id, genre_id)
    SELECT $1, genres.id
    FROM genres
    WHERE genres.name = ANY($2::text[]);`

    const client = await pool.connect()

    try {
        await client.query("BEGIN;")
        await client.query(insertDeveloperNameQuery, [developerName])
        const gameResult = await client.query(insertGameInfoQuery, [gameTitle, developerName, imageUrl])
        const gameId = gameResult.rows[0].id
        await client.query(updateJunctionTable, [gameId, genres])
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


async function deleteGameFromDatabase(id) {
    const deleteDeveloperQuery = `DELETE FROM developers
    WHERE id IN (
    SELECT developer_id
    FROM games
    WHERE id = $1
    GROUP BY developer_id
    HAVING COUNT(*) = 1
    );`

    const deleteGame = `DELETE FROM games
    WHERE id = $1;`

    const client = await pool.connect()

    try {
        await client.query("BEGIN;")
        await client.query(deleteDeveloperQuery, [id])
        await client.query(deleteGame, [id])
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


module.exports = {insertGameInfo, getGamesInfo, getGenresFromDatabase, getIndividualGameInfo, getGamesForGenre, deleteGameFromDatabase}