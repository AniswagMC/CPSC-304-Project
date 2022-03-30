const express = require('express');
const pg = require('pg');
const app = express();
const port = 3001;

app.get('/', (req, res) => res.status(200).send('Hello World!'));

app.listen(port, () => console.log(`Listening on port ${port}!`));