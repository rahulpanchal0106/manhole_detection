const sensordata_model = require('../models/sensordata.model');

async function postSensorData (req, res) {
    const data = req.body;
    console.log("✨✨\n", data);

    if (data) {
        try {
            await sensordata_model.create(data);
            console.log('Data saved to the database');
            
            // Emit data to connected clients
            io.emit('sensorData', data);

            res.status(200).send("🚀 Data Received By Server");
        } catch (e) {
            console.error('Data could not be saved to the database\n', e);
            res.status(500).send("☄️ Error saving data to the database");
        }
    } else {
        res.status(501).send("☄️ Data was not received by Server");
    }
}
module.exports = postSensorData;
