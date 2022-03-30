const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ani',
  host: 'localhost',
  database: 'trains',
  password: 'root',
  port: 4321,
});

