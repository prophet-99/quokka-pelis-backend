const express = require('express');
const { baseAPI } = require('./../config');

const app = express();

app.use(`${ baseAPI }/usuario`, require('./usuarios'));
app.use(`${ baseAPI }/rol`, require('./roles'));
app.use(`${ baseAPI }/auth`, require('./auth'));
app.use(`${ baseAPI }/auth`, require('./serie'));
app.use(`${ baseAPI }/auth`, require('./temporada'));
app.use(`${ baseAPI }/auth`, require('./capitulo'));

module.exports = app;