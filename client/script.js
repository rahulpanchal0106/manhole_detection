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

// const payload = {
//     "tilt" : {
//         "x":x,
//         "y":y,
//         "z":z
//     }
// }
    
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
// });

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50,2/1,.1,1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(500,300);
const lidContainer = document.querySelector('.lid-container')
lidContainer.appendChild(renderer.domElement)

const geometry = new THREE.CylinderGeometry(2,2,7,50);
const material = new THREE.MeshBasicMaterial({
    color:'#8bc34a'
});
const cylinder = new THREE.Mesh(geometry,material);

scene.add(cylinder);




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
                var pitch = data.tilt.pitch;
                var roll = data.tilt.roll;
                // var z = data.tilt.z;
                // document.getElementById('temperatureValue').textContent = `Temperature: ${temperatureData} °C`;
                // document.getElementById('gasValue').textContent = `Gas Level: ${gasData} ppm`;
                // document.getElementById('waterLevelValue').textContent = `Water Level: ${waterLevelData} cm`;
                var tiltData = `${pitch} , ${roll}`;

                const alertList = document.querySelector('#alertList')
                const indicator = document.querySelector('#indicator')
                const animate = ()=>{
                    requestAnimationFrame(animate)

                    cylinder.rotation.x = pitch;
                    cylinder.rotation.y = roll;

                    renderer.render(scene,camera)
                }
                
                animate();
                if(pitch>=25 || pitch<=-25 || roll>=15 || roll<=-15){
                    console.log('Tilted');
                    indicator.style.backgroundColor="red";
                    alertList.innerHTML=`Disturbed`;
                }else{
                    console.log("Not tilted");
                    indicator.style.backgroundColor="green";
                    alertList.innerHTML="Undisturbed"
                }

                document.querySelector('#tilt').textContent = tiltData

            }else{
                // document.getElementById('temperatureValue').textContent = `Temperature: null °C`;
                // document.getElementById('gasValue').textContent = `Gas Level: null ppm`;
                // document.getElementById('waterLevelValue').textContent = `Water Level: null cm`;

                document.querySelector('#tilt').textContent = 'No data from server'
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


