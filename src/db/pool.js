const {Pool} = require("pg")

module.exports = new Pool ({
    host: PGHOST,
    user: process.env.PGUSER,
    database: PGDATABASE,
    port: process.env.PGPORT
})