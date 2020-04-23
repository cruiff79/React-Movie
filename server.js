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

app.get('/api/video/popular/:type', (req, res) => {
    let qry = "SELECT * FROM MOVIE WHERE TYPE = ? ORDER BY CAST(REPLACE(imdbVotes, ',', '') AS UNSIGNED) DESC LIMIT 12";
    let type = req.params.type;
    if(type == 'tv') type = 'series';
    let params = [type];
    connection.query(qry, params, (err, rows) => {
        if(err) console.log(err);
        res.send(rows);
    });
});

app.get('/api/video/topRated/:type', (req, res) => {
    let qry = "SELECT * FROM MOVIE WHERE TYPE = ? ORDER BY imdbRating DESC LIMIT 12";
    let type = req.params.type;
    if(type == 'tv') type = 'series';
    let params = [type];
    connection.query(qry, params, (err, rows) => {
        if(err) console.log(err);
        res.send(rows);
    });
});

app.get('/api/video/type/:type', (req, res) => {
    let qry = 'SELECT * FROM MOVIE WHERE TYPE = ?';
    let type = req.params.type;
    if(type == 'tv') type = 'series';
    let params = [type];
    connection.query(qry, params, (err, rows) => {
        if(err) console.log(err);
        res.send(rows);
    });
});

app.get('/api/video/:id', (req, res) => {
    let qry = 'SELECT * FROM MOVIE WHERE ID = ?';
    let id = req.params.id
    let params = [id];
    connection.query(qry, params, (err, rows) => {
        if(err) console.log(err);
        res.send(rows);
    });
});

app.get('/api/video/search/:search', (req, res) => {
    let qry = "SELECT * FROM MOVIE WHERE TITLE LIKE " + "'%" + req.params.search + "%'";
    connection.query(qry, (err, rows) => {
        if(err) console.log(err);
        res.send(rows);
    });
});

app.post('/api/video', (req, res) => {
    let movie = req.body.movie;
    let qry = 'INSERT INTO MOVIE(title, year, released, runtime, genre, director, writer, actors, plot, language, country, awards, poster, imdbRating, imdbVotes, imdbID, type, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
    let title = movie.Title;
    let year = movie.Year;
    let released = movie.Released;
    let runtime = movie.Runtime;
    let genre = movie.Genre;
    let director = movie.Director;
    let writer = movie.Writer;
    let actors = movie.Actors;
    let plot = movie.Plot;
    let language = movie.Language;
    let country = movie.Country;
    let awards = movie.Awards;
    let poster = movie.Poster;
    let imdbRating = movie.imdbRating;
    let imdbVotes = movie.imdbVotes;
    let imdbID = movie.imdbID;
    let type = movie.Type;
    let params = [title, year, released, runtime, genre, director, writer, actors, plot, language, country, awards, poster, imdbRating, imdbVotes, imdbID, type];

    connection.query(qry, params, (err, rows, fields) => {
        if(err) {
            console.log('err: ', err.sqlMessage);
            res.send(err.sqlMessage);
        }
        if(rows) {
            console.log('rows: ', rows);
            res.send('Submited!');
        }
    });
});

app.listen(port, () => console.log(`movie app http://localhost:${port}`));