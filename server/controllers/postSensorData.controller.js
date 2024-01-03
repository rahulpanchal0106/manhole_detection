const sensordata_model = require('../models/sensordata.model')

function postSensorData(req,res){
    const data = req.body;
    console.log(data);
    sensordata_model.create(data)
    if(data){
        res.status(200).json({'msg':'Data received'})
    }else{
        res.status(501).json({'msg':'Data not received'})
    }
}

module.exports = postSensorData