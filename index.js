const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3006;


app.use(bodyParser.json());

let movies = [];
let nextId = 1;

app.post('/movies', (req, res) => {
  const { title, director, year, rating } = req.body;
  const newMovie = { id: nextId++, title, director, year, rating};
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.get('/movies', (req, res) => {
  res.json(movies);
});


app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id, 10));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});


app.put('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id, 10));
  if (movie) {
    const { title, director, year, rating } = req.body;
    movie.title = title;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id, 10));
  if (movieIndex !== -1) {
    movies.splice(movieIndex, 1);
    res.status(200).send(
        'Movie deleted'
    );
  } else {
    res.status(404).send('Movie not found');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});