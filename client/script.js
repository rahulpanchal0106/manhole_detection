// document.querySelector('#send').addEventListener('click',(e)=>{
//     e.preventDefault();
//     let temp = document.querySelector('#temp').value
//     let gas = document.querySelector('#gas').value
//     let water = document.querySelector('#water').value

//     const sensorData = {
//         "temperature": temp,
//         "gas": gas,
//         "waterlevel" : water
//     }
    
//     fetch('/sensordata',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify(sensorData)
//     })
//     .then((res)=>{
//         return res.json()
//     })
//     .then((data)=>{
//         console.log(data)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })

document.addEventListener('DOMContentLoaded',function () {
    setInterval(async function () {
        
        
        // await fetch('/sensordata')
        // .then((res)=>{
        //     return res.json()
        // })
        // .then((data)=>{
        //     console.log(data)
        //     if(data){
        //         var temperatureData = data.temperature;
        //         var gasData = data.gas;
        //         var waterLevelData = data.waterlevel;
        //         document.getElementById('temperatureValue').textContent = `Temperature: ${temperatureData} °C`;
        //         document.getElementById('gasValue').textContent = `Gas Level: ${gasData} ppm`;
        //         document.getElementById('waterLevelValue').textContent = `Water Level: ${waterLevelData} cm`;
        //     }else{
        //         document.getElementById('temperatureValue').textContent = `Temperature: null °C`;
        //         document.getElementById('gasValue').textContent = `Gas Level: null ppm`;
        //         document.getElementById('waterLevelValue').textContent = `Water Level: null cm`;
        //     }

        //     // Update the alerts list
        //     var alerts = getAlerts(temperatureData,waterLevelData,gasData);
        //     updateAlertsList(alerts);

        // })
        // .catch((err)=>{
        //     console.log('getsensordata error\n',err)
        // })

        getData()
        
    }, 2000);
});

async function getData(){
    await fetch('/sensordata')
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        // console.log(data)
        // data.forEach(doc=>{
        //     console.log(`temp: ${doc.temperature}`)
        //     console.log(`waterlevel: ${doc.waterlevel}`)
        //     console.log(`gas: ${doc.gas}`)
        // })
        console.log(data)
            if(data){
                // var temperatureData = data.temperature;
                // var gasData = data.gas;
                // var waterLevelData = data.waterlevel;
                // document.getElementById('temperatureValue').textContent = `Temperature: ${temperatureData} °C`;
                // document.getElementById('gasValue').textContent = `Gas Level: ${gasData} ppm`;
                // document.getElementById('waterLevelValue').textContent = `Water Level: ${waterLevelData} cm`;
                var tiltData = data.tilt;

                document.querySelector('.tilt').textContent = tiltData

            }else{
                // document.getElementById('temperatureValue').textContent = `Temperature: null °C`;
                // document.getElementById('gasValue').textContent = `Gas Level: null ppm`;
                // document.getElementById('waterLevelValue').textContent = `Water Level: null cm`;

                document.querySelector('.tilt').textContent = 'No data from server'
            }

            // Update the alerts list
        //var alerts = getAlerts(temperatureData,waterLevelData,gasData);
        //updateAlertsList();

        return data
    })
    .catch((err)=>{
        console.log('getsensordata error\n',err)
    })
}

// Function to get random alerts (replace with your actual implementation)
function getAlerts() {
    return Math.random() > 0.8 ? ['Manhole Overflow', 'High Gas Level'] : [];
    // if(waterlevel>20){
    //     return 'Manhole Overflow'
    // }else if(gas>50){
    //     return 'high gas level'
    // }else if(temp>60){
    //     return 'High temperature'
    // }else{
    //     return 'no alerts....'
    // }
}

// Function to update the alerts list
function updateAlertsList(alerts) {
    var alertList = document.getElementById('alertList');
    alertList.innerHTML = ''; // Clear existing alerts

    if (alerts.length > 0) {
        alerts.forEach(function (alert) {
            var listItem = document.createElement('li');
            listItem.textContent = alert;
            alertList.appendChild(listItem);
        });
    } else {
        var listItem = document.createElement('li');
        listItem.textContent = 'No Alerts';
        alertList.appendChild(listItem);
    }
}












//do something like this on hardware to post the json sensordata to the server


