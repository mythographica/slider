const port = 3001;

console.log(port);

const express = require('express')
const app = express();

const static = express.static('./docs');

app.use(static);

app.listen(port);