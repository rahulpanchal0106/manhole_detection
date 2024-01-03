document.addEventListener('DOMContentLoaded', function () {
    // Simulate real-time data and alerts update (replace with your actual implementation)
    setInterval(function () {
        // Assuming you have a function to fetch data and alerts from the IoT devices
        // Update the following lines with your actual data fetching logic
        var temperatureData = getRandomData();
        var gasData = getRandomData();
        var waterLevelData = getRandomData();
        var alerts = getAlerts();

        // Update the displayed values on the webpage
        document.getElementById('temperatureValue').textContent = `Temperature: ${temperatureData} °C`;
        document.getElementById('gasValue').textContent = `Gas Level: ${gasData} ppm`;
        document.getElementById('waterLevelValue').textContent = `Water Level: ${waterLevelData} cm`;

        // Update the alerts list
        updateAlertsList(alerts);
    }, 5000); // Update every 5 seconds (adjust as needed)
});

// Function to generate random data (replace with your actual implementation)
function getRandomData() {
    return (Math.random() * 50 + 10).toFixed(2); // Replace with actual data
}

async function getData(){
    fetch('/sensordata')
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        data.forEach(doc=>{
            console.log(`temp: ${doc.temperature}`)
            console.log(`waterlevel: ${doc.waterlevel}`)
            console.log(`gas: ${doc.gas}`)
        })
    })
    .catch((err)=>{
        console.log('getsensordata error\n',err)
    })
}

// Function to get random alerts (replace with your actual implementation)
function getAlerts() {
    return Math.random() > 0.8 ? ['Manhole Overflow', 'High Gas Level'] : [];
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

const sensorData = {
    "temperature": 23,
    "gas": 34.98,
    "waterlevel" : 13.90
}

fetch('/sensordata',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(sensorData)
})
.then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})

