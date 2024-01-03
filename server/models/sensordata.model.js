const mongoose = require('mongoose');

const sensordata_schema = mongoose.Schema({
    temperature:{
        type:Number
    },
    waterlevel:{
        type:Number
    },
    gas:{
        type:Number
    }
},{
    timestamps:true
});

const sensordata_model = mongoose.model('sensor_data',sensordata_schema);

module.exports = sensordata_model