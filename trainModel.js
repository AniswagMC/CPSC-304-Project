const Pool = require('pg').Pool

//chris pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Trains',
  password: 'cpsc304',
  port: 3040,
});

// ansi pool
// const pool = new Pool({
//   user: 'ani',
//   host: 'localhost',
//   database: 'trains',
//   password: 'root',
//   port: 4321,
// });

const getTrains = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM trains', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createTrain = (body) => {
  return new Promise(function(resolve, reject) {
    const { train_id, year_in_service, train_type } = body
    pool.query('INSERT INTO trains (train_num, year_in_service, year_built, train_id, train_type) VALUES ($1, $2, $3, $4, $5) RETURNING *', [train_id, year_in_service, train_type], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new train has been added: ${results.rows[0]}`)
    })
  })
}

const deleteTrain = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM trains WHERE train_num = $1', [train_num], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Train deleted with ID: ${train_num}`)
    })
  })
}

module.exports = {
  getTrains,
  createTrain,
  deleteTrain,
}

