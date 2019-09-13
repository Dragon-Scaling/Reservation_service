const { Pool, Client } = require('pg')

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'reservationsmodule',
  password: 'password',
  port: 5433,
})
module.exports = pool
