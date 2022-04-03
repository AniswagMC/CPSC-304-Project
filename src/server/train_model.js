const Pool = require('pg').Pool
const pool = new Pool({
  user: 'chris',
  host: 'localhost',
  database: 'trains_db',
  password: '304',
  port: 3040,
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

const getTrains2000 = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM trains WHERE year_built < 2000', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

const updateTrain = (body) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE trains SET train_num = $1, year_in_service = $2, year_built = $3, train_type = $5 WHERE train_id = $4' , [body.train_num, body.year_in_service, body.year_built, body.train_id, body.train_type], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Train updated with id: ${body.train_id}`);
      });
  })
}

const gettjoin = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT t.train_id FROM trains t, visits v WHERE t.train_num = v.train_num AND v.arrival_time = \'09:30\'', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

const getgbyq = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT MAX(v.depart_time) FROM trains t, visits v WHERE t.train_num = v.train_num GROUP BY t', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

const getdiv = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT t.train_id FROM trains t WHERE NOT EXISTS (SELECT s.station_num FROM Stations s EXCEPT (SELECT v.station_num FROM visits v WHERE v.train_num = t.train_num))', (error, results) => {
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

const getMaxStation = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT MAX(station_num) FROM stations', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}


const getVisits = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM visits', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getVisitsATime = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT (arrival_time) FROM visits', (error, results) => {
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

const createVisit = (body) => {
  return new Promise(function (resolve, reject) {
    const { train_num, station_num, arrival_time, depart_time } = body
    pool.query('INSERT INTO visits (train_num, station_num, arrival_time, depart_time) VALUES ($1, $2, $3, $4) RETURNING *', [train_num, station_num, arrival_time, depart_time], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new visit has been added`)
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

const deleteVisit = (train_num, station_num) => {
  return new Promise(function (resolve, reject) {
    pool.query('DELETE FROM visits WHERE train_num = $1 AND station_num = $2', [train_num, station_num], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Visit deleted`)
    })
  })
}


module.exports = {
  getTrains,
  getTrains2000,
  gettjoin,
  getgbyq,
  getdiv,
  getStations,
  getMaxStation,
  getVisits,
  getVisitsATime,
  createTrain,
  updateTrain,
  createStation,
  createVisit,
  deleteTrain,
  deleteStation,
  deleteVisit
}