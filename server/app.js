const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
let { API_PORT } = require('./envConstants');

const app = express();
const server = new http.Server(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    console.log('new client connected');
    socket.emit('connection', null);
});

app.listen(API_PORT, () => {
    console.log(`Api listening on port ${API_PORT}!`);
});

server.listen(Number(API_PORT) + 1, () => {
    console.log(`SocketIo listening on port ${Number(API_PORT) + 1}!`);
    // logger.info(`Socker listening on port ${API_PORT + 1}!`);
    // logger.info(`Api and socker whitelisted for ${hosts}`);
});
