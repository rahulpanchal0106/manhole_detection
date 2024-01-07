const mongoose = require('mongoose');

const sensordata_schema = mongoose.Schema({
    tilt:{
        type:Object
    },
    dht:{
        type:Object
    },
    // gas:{
    //     type:Number
    // }
},{
    timestamps:true
});

const sensordata_model = mongoose.model('sensor_data',sensordata_schema);

module.exports = sensordata_model