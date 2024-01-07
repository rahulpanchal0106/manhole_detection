const sensordata_model = require('../models/sensordata.model');

async function getSensorData (req,res){
    try{
        const sensordata = await sensordata_model.findOne({}).sort({ timestamp: -1 });
        console.log(sensordata.tilt,"\n",sensordata.dht)
        res.json(sensordata)
    }catch(err){
        console.log('get sensordata error\n',err);
    }
}

module.exports = getSensorData

