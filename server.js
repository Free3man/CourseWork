// Connecting libraries to the project
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// Init of the WebSocket server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run the initial tests
io.on('connection', socket => {  
    socket.on('joinRoom', code => {
        socket.join(code);
        socket.on('disconnect', () => {
            io.to(code).emit('systemMessage', 'A user has left the chat');
        });
        socket.on('userMessage', (userMessage) => {
            io.to(code).emit('chatMessage', userMessage)
        });        
    });
    socket.on('fillUser', userData => {
        socket.emit('systemMessage', 'Welcome to the Game');
        io.to(userData.session).emit('systemMessage', `A ${userData.name} has joined the game`);
    });
});  

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

