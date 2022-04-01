const express = require('express');
const pg = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;
const trainModel = require('./trainModel');

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('Hello World!'));

app.get('/', (req, res) => {
    trainModel.getTrains()
        .then(trains => {
            res.status(200).json(trains);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));