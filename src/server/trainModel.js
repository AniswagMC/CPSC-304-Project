const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ani',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 4321,
});

const getTrains = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM trains', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

const getStations = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM stations', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createTrain = (body) => {
  return new Promise(function (resolve, reject) {
    const { train_num, year_in_service, year_built, train_id, train_type } = body
    pool.query('INSERT INTO trains (train_num, year_in_service, year_built, train_id, train_type) VALUES ($1, $2, $3, $4, $5) RETURNING *', [train_num, year_in_service, year_built, train_id, train_type], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new train has been added`)
      // resolve(`A new train has been added added: ${results.rows[0]}`)
    })
  })
}

const createStation = (body) => {
  return new Promise(function (resolve, reject) {
    const { station_num, address, name } = body
    pool.query('INSERT INTO stations (station_num, address, name) VALUES ($1, $2, $3) RETURNING *', [station_num, address, name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new station has been added`)
      // resolve(`A new train has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteTrain = (train_num) => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM trains WHERE train_num = $1', [train_num], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Train deleted with num: ${train_num}`)
    })
  })
}

const deleteStation = (station_num) => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM stations WHERE station_num = $1', [station_num], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Station deleted with num: ${Station_num}`)
    })
  })
}


module.exports = {
  getTrains,
  getStations,
  createTrain,
  createStation,
  deleteTrain,
  deleteStation,
}