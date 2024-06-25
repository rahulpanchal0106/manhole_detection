const sensordata_model = require('../models/sensordata.model');

async function getSensorData (req,res){
    try{
        // const sensordata = await sensordata_model.findOne({}).sort({ timestamp: -1 });
        const sensordata = await sensordata_model.find({});
        const lastData = sensordata[sensordata.length-1];
        // console.log(lastData.tilt,"\n",lastData.dht);
        // const forwarded = req.headers['x-forwarded-for'];
        // console.log(req.connection.remoteAddress)
        res.json(lastData);
    }catch(err){
        console.log('get sensordata error\n',err);
    }
}

module.exports = getSensorData

