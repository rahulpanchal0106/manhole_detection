const sensordata_model = require('../models/sensordata.model');

async function getSensorData (req,res){
    try{
        const sensordata = await sensordata_model.find({})
        console.log(sensordata[sensordata.length-1].tilt,"\n",sensordata[sensordata.length-1].dht)
        res.json(sensordata[sensordata.length-1])
    }catch(err){
        console.log('get sensordata error\n',err);
    }
}

module.exports = getSensorData

