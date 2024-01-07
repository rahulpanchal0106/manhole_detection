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

// app.get('/')
const receieved_data =[];
app.post('/sensordata',function(req,res){
    
    const data = req.body;
    console.log("✨✨\n",data);
    
    if(data){
        try{
            // sensordata_model.create(data)
            receieved_data.push(data)
        }catch(e){
            console.log('Data could not be save to the database\n',e);
        }
        res.status(200).send("🚀 Data Received By Server");

    }else{
        res.status(501).send("☄️ Data was not received by Server")
    }
})

app.get('/sensordata',function (req,res){
    try{
        // const sensordata = await sensordata_model.find({})
        // console.log(sensordata[sensordata.length-1].tilt)
        // res.json(sensordata[sensordata.length-1])

        console.log(receieved_data[receieved_data.length-1]);
        res.json(receieved_data[receieved_data.length-1])

    }catch(err){
        console.log('get sensordata error\n',err);
    }
})

module.exports = app;