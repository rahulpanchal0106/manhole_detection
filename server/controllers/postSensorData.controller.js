const sensordata_model = require('../models/sensordata.model')

function postSensorData(req,res){
    
    const data = req.body;
    console.log("✨✨\n",data);
    
    if(data){
        try{
            sensordata_model.create(data)
        }catch(e){
            console.log('Data could not be save to the database\n',e);
        }
        res.status(200).send("🚀 Data Received By Server");

    }else{
        res.status(501).send("☄️ Data was not received by Server")
    }
}

module.exports = postSensorData;

