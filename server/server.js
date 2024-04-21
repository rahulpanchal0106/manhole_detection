require('dotenv').config();
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

const MONGOURI = process.env.MONGOURI

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Serving dashboard')
    res.sendFile(path.join(__dirname, '..', 'client', 'dashboard.html'))
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

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server live ${PORT}`);
});

mongoose.connection.once('connected', () => {
    console.log('Database connected!')
});

mongoose.connection.on('error', (e) => {
    console.error('Database connection error\n', e)
});

async function start_server() {
    try {
        await mongoose.connect(MONGOURI);
        console.log(`Server live ${PORT}`);
    } catch (err) {
        console.error('Server start error\n', err)
    }
}

start_server();
