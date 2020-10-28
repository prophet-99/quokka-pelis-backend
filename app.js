const express = require('express');
const cors = require('cors');
const { port } = require('./config');

const app = express();

app.use( cors() )
    .use( express.json() )
    .use( require('./routes') );

app.listen( port, () => console.log(`Listen in PORT ${ port }`) );