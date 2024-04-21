const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'client')));

// Set up routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dashboard.html'));
});

// Set up Socket.IO connection
io.on('connection', (socket) => {
    console.log('A client connected');
    
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
