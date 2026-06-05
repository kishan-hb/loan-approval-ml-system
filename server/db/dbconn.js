const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  host: config.pg.host || '127.0.0.1',
  port: Number(config.pg.port) || 5432,
  database: config.pg.database || 'loan_db',
  user: config.pg.user,
  password: config.pg.password,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: false
});

async function connectDB() {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
    return pool;
  } catch (err) {
    console.error('PostgreSQL connection error:', err);
    throw err;
  }
}

module.exports = connectDB;
module.exports.pool = pool;
module.exports.query = (text, params) => pool.query(text, params);
