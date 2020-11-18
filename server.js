// console.log("Hello from Server");
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const users = {};

const app = express();

const server = http.createServer(app)
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public')));

io.on('connection', soc => {
    soc.on("send-chat-message", data => {
        console.log("message: "+ data);
        soc.broadcast.emit('chat-message', {name: users[soc.id], message: data})
    });

    soc.on('new-user', data => {
        users[soc.id] = data;
        soc.broadcast.emit('user-connected', data);
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT,()=> { console.log(`Server is listening on port ${PORT} ...`);})
