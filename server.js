const fs = require('fs');
const express = require('express');
const app = express();
const port = 5000;

const movies = require(__dirname + '/movie.json');

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/movie', (req, res) => {
    console.log(movies);
    res.send(movies);
});

app.listen(port, () => console.log(`movie app http://localhost:${port}`));