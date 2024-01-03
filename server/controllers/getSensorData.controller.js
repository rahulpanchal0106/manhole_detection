const sensordata_model = require('../models/sensordata.model');

async function getSensorData (req,res){
    try{
        const sensordata = await sensordata_model.find({})
        res.json(sensordata)
    }catch(err){
        console.log('get sensordata error\n',err);
    }
}

module.exports = getSensorData