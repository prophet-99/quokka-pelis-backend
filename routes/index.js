const express = require('express');
const { baseAPI } = require('./../config');

const app = express();

app.use(`${ baseAPI }/usuario`, require('./usuarios'));
// app.use(`${ baseAPI }/pelicula`, require('./pelicula'));

module.exports = app;