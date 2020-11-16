const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
let { API_PORT } = require('./envConstants');

const app = express();
const server = new http.Server(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

console.log("asd", API_PORT);

app.listen(API_PORT, () => {
    console.log(`Api listening on port ${API_PORT}!`);
});
