const express = require('express');
const { baseAPI } = require('./../config');

const app = express();

app.use(`${ baseAPI }/usuario`, require('./usuarios'));
app.use(`${ baseAPI }/rol`, require('./roles'));
app.use(`${ baseAPI }/pago`, require('./pago'));
app.use(`${ baseAPI }/auth`, require('./auth'));
app.use(`${ baseAPI }/pelicula`, require('./peliculas'));
app.use(`${ baseAPI }/genero`, require('./generos'));
app.use(`${ baseAPI }/video`, require('./videos'));
app.use(`${ baseAPI }/actor`, require('./actores'));
app.use(`${ baseAPI }/director`, require('./directores'));
app.use(`${ baseAPI }/estudio`, require('./estudios'));
app.use(`${ baseAPI }/personaje`, require('./personaje'));

module.exports = app;