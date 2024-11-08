const { Pool } = require('pg')

const pool = new Pool({
  host: 'ep-calm-recipe-a6e1xq22.us-west-2.aws.neon.tech',
  user: 'sistem_owner',
  password: 'D1uoNMvtaQ3w',
  database: 'mercadim',
  port: 5432,
  ssl: { rejectUnauthorized: false },
})

module.exports = pool

