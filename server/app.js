// import './database/db';
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
let { DB_URL, API_PORT } = require('./envConstants');

// import { socker } from './socker';
// import { handleError, authenticated, logger } from './middlewares';
// import { API_PORT, hosts } from './env';


const app = express();
const server = new http.Server(app);
// socker(server);

// app.use(cors({ origin: hosts, credentials: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/users', authenticated);
// app.use('/search', authenticated);

app.use(routes);

// app.use((err, _req, res, _) => {
//     handleError(err, res);
// });

console.log("asd", API_PORT);

app.listen(API_PORT, () => {
    // console.log(`Api listening on port ${Number(API_PORT)}!`);
    console.log(`Api listening on port ${API_PORT}!`);
});

// server.listen(Number(API_PORT) + 1, () => {
//     logger.info(`Socker listening on port ${Number(API_PORT) + 1}!`);
//     // logger.info(`Api and socker whitelisted for ${hosts}`);
// });