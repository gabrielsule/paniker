const { Pool } = require('pg');

const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 5000,

  host: 'c-panic.uwg5avqd3ps56k.postgres.cosmos.azure.com',
  port: 5432,
  user: 'citus',
  password: 'Fartzilla666',
  database: 'citus',
  ssl: true,
});

module.exports = {
  pool,
};