const express = require('express');
const app = express();
const port = 5000;

const movies = require(__dirname + '/movie.json');

app.get('/movie', (req, res) => {
    console.log(movies);
    res.send(movies);
});

app.listen(port, () => console.log(`movie app http://localhost:${port}`));