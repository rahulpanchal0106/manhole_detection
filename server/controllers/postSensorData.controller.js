const sensordata_model = require('../models/sensordata.model')

function postSensorData(req,res){
    const data = req.body;
    console.log(data);
    sensordata_model.create(data)
    if(data){
        res.status(200).send("🚀 Data Received By Server")
    }else{
        res.status(501).send("☄️ Data was not received by Server")
    }
}

module.exports = postSensorData