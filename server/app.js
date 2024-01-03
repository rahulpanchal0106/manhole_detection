const express = require('express');
const app = new express();
const path = require('path')
const bodyParser = require('body-parser')

// const sensordata_model = require('./models/sensordata.model')
const getSensorData = require('./controllers/getSensorData.controller');
const postSensorData = require('./controllers/postSensorData.controller')

app.use(express.static(path.join(__dirname,'..','client')));


app.use(bodyParser.json())

app.get('/',(req,res)=>{
    console.log('serving dashboard')
    res.sendFile(path.join(__dirname,'..','client','dashboard.html'))
})

app.post('/sensordata',postSensorData)

app.get('/sensordata',getSensorData)

module.exports = app;