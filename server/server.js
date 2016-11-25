// import dependencies
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


// import modules
const {Users} = require('./utils/users')
const {isRealString} = require('./utils/validation')
const {generateMessage} = require('./utils/message')
// set up server / sockets / path to front end
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var room = new Room();

// serve
app.use(express.static(publicPath));

// socket events

io.on('connection', (socket) => {
    console.log('new user connected');



    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Name and room name are required.')
        }

        callback()
    })
    
    users.removeUser(socket.id);

    io.to().emit();

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Ultimate Bravery!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('', `${params.name} has joined.`));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from the server.');
    });

    socket.on('disconnect', () => {
        console.log('client disconnected')
    });
});

server.listen(port, () => {
    console.log(
        `port is running on ${port}`
    );
});