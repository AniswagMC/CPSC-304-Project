const express = require('express');
const pg = require('pg');
const app = express();
const port = 3001;

const train_model = require('./trainModel').default;

app.use(express.json);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    console.log("getting trains");
    train_model.getTrains()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});
  
app.post('/trains', (req, res) => {
    train_model.createTrain(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});
  
app.delete('/trains/:train_num', (req, res) => {
    train_model.deleteTrain(req.params.train_num)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});