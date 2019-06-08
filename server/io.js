require('dotenv').config();
const io = require('socket.io')();

// SOCKET IO CONNECTION EVENT
io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
});

module.exports = io;