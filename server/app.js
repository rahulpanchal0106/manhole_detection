const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const sensordata_model = require('./models/sensordata.model');
const getSensorData = require('./controllers/getSensorData.controller');
const postSensorData = require('./controllers/postSensorData.controller');

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('serving dashboard')
    res.sendFile(path.join(__dirname, '..', 'client', 'dashboard.html'))
});
app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'node_modules', 'socket.io', 'client-dist', 'socket.io.js'));
});

app.post('/sensordata', async (req, res) => {
    const data = req.body;
    console.log("✨✨\n", data);

    if (data) {
        try {
            await sensordata_model.create(data);
            console.log('Data saved to the database');
            
            // Emit data to connected clients
            io.emit('sensorData', data);

            res.status(200).send("🚀 Data Received By Server");
        } catch (e) {
            console.error('Data could not be saved to the database\n', e);
            res.status(500).send("☄️ Error saving data to the database");
        }
    } else {
        res.status(501).send("☄️ Data was not received by Server");
    }
});

app.get('/sensordata', getSensorData);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = app;
