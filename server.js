const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/api/movie', (req, res) => {
    let qry = 'SELECT * FROM MOVIE WHERE TYPE = ?';
    let type = 'movie'
    let params = [type];
    connection.query(qry, params, (err, rows) => {
        res.send(rows);
    });
});

app.get('/api/movie/:id', (req, res) => {
    let qry = 'SELECT * FROM MOVIE WHERE ID = ?';
    let id = req.params.id
    let params = [id];
    connection.query(qry, params, (err, rows) => {
        res.send(rows);
    });
});

app.post('/api/movie', (req, res) => {
    let movie = req.body.movie;
    let qry = 'INSERT INTO MOVIE(title, year, released, runtime, genre, director, writer, actors, description, poster, rating, type, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
    let title = movie.Title;
    let year = movie.Year;
    let released = movie.Released;
    let runtime = movie.Runtime;
    let genre = movie.Genre;
    let director = movie.Director;
    let writer = movie.Writer;
    let actors = movie.Actors;
    let description = movie.Plot;
    let poster = movie.Poster;
    let rating = movie.imdbRating;
    let type = movie.Type;
    let params = [title, year, released, runtime, genre, director, writer, actors, description, poster, rating, type];

    connection.query(qry, params, (err, rows, fields) => {
        res.send(rows);
    });
});

app.listen(port, () => console.log(`movie app http://localhost:${port}`));