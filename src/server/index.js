const express = require('express')
const app = express()
const port = 3001

const train_model = require('./train_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
// get trains
app.get('/t', (req, res) => {
  train_model.getTrains()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
// get trains before 2000
app.get('/t2000', (req, res) => {
    train_model.getTrains2000()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
app.get('/tjoin', (req, res) => {
    train_model.gettjoin()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})
app.get('/gbyq', (req, res) => {
    train_model.getgbyq()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})
app.get('/maxs', (req, res) => {
    train_model.getMaxStation()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})
app.get('/div', (req, res) => {
    train_model.getdiv()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})
// get stations
app.get('/s', (req, res) => {
  train_model.getStations()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
// get visits
app.get('/v', (req, res) => {
    train_model.getVisits()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
app.get('/vatime', (req, res) => {
    train_model.getVisitsATime()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})
//create train
app.post('/trains', (req, res) => {
  train_model.createTrain(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
//create station
app.post('/stations', (req, res) => {
  train_model.createStation(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
//create visit
app.post('/visits', (req, res) => {
    train_model.createVisit(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

app.delete('/trains/:train_num', (req, res) => {
  train_model.deleteTrain(req.params.train_num)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.delete('/stations/:station_num', (req, res) => {
    train_model.deleteTrain(req.params.station_num)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
app.delete('/visits/:train_num/:station_num', (req, res) => {
    train_model.deleteVisit(req.params.train_num, req.params.station_num)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})