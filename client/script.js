const scene = new THREE.Scene();
scene.background= new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(50,2/1,0.1,1000);
camera.position.set(0, 0, 100);  
camera.lookAt(0, 0, 0); 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(500,300);

const rendered_obj = renderer.domElement;

rendered_obj.style.width="80vw";
// rendered_obj.style.backgroundColor="white"
const lidContainer = document.querySelector('.lid-container')
lidContainer.appendChild(rendered_obj)

const geometry = new THREE.CylinderGeometry(30,30,5,100);
const material = new THREE.MeshPhongMaterial({
    color: '#0d6efd',
    shininess: 100
});

const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);    

const cylinder = new THREE.Mesh(geometry,material);

scene.add(cylinder);




document.addEventListener('DOMContentLoaded',function () {
    setInterval(async function () {
        getData()
        
    }, 2000);
});

async function getData(){
    await fetch('/sensordata')
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
            if(data){
                var pitch = data.tilt.pitch;
                var roll = data.tilt.roll;
                var yaw = 0;
                var temperature = data.dht.temperature;
                var humidity = data.dht.humidity;

                const alertList = document.querySelector('#alertList');
                const indicator = document.querySelector('#indicator');

                const animate = ()=>{
                    
                    const pitchRadians = THREE.MathUtils.degToRad(pitch);
                    const rollRadians = THREE.MathUtils.degToRad(roll);
                    yaw = Math.atan2(Math.sin(rollRadians), Math.cos(pitchRadians) * Math.cos(rollRadians));
                    const yawRadians = THREE.MathUtils.degToRad(yaw);

                    // cylinder.rotation.set(rollRadians, pitchRadians,yawRadians);
                    // cylinder.rotation.set(pitch,roll, yaw);
                    // cylinder.rotation.set(THREE.MathUtils.degToRad(pitch), THREE.MathUtils.degToRad(roll), THREE.MathUtils.degToRad(yaw));

                    // cylinder.rotation.set(10, 10, 0);
                    // cylinder.rotation.y = rollRadians;
                    
                    cylinder.rotation.x = rollRadians;
                    cylinder.rotation.y = yawRadians;
                    cylinder.rotation.z = pitchRadians;
                    renderer.render(scene,camera);
                    
                    requestAnimationFrame(animate)
                }
                
                const updateThermometerHeight = (height) => {
                    const thermometerLineBody = document.getElementById('thermometerLineBody');
                    document.querySelector('#thermo-temp').innerHTML=`${height}&deg;`;
                    thermometerLineBody.setAttribute('width',5*(100-height));  
                };

                const gaugeFill = document.getElementById('gaugeFill');

                function updateGauge(value) {
                    // const dashArray = `${value} ${100 - value}`;
                    // gaugeFill.setAttribute('stroke-dasharray', dashArray);
                    const humidityText = document.getElementById('humidityText');
                    humidityText.textContent = `${value}%`;
                }

                updateGauge(humidity);


                animate();
                updateThermometerHeight(temperature);
                if(pitch>=25 || pitch<=-25 || roll>=15 || roll<=-15){
                    console.log('Tilted');
                    indicator.style.backgroundColor="red";
                    alertList.innerHTML=`Disturbed`;
                }else{
                    console.log("Not tilted");
                    indicator.style.backgroundColor="green";
                    alertList.innerHTML="Undisturbed"
                }

                if(temperature>=60){
                    console.log("Temperature is above 60deg cel");
                    alertList.innerHTML+=`Temperature above 60&deg;`
                }
                var tiltData = `tilt data: ${pitch} , ${roll} , ${yaw}`;
                var dhtData = `dht11 data: ${temperature}\u2103, ${humidity}%`
                document.querySelector('#tilt').textContent = tiltData
                document.querySelector('#dht').textContent = dhtData

            }else{
                document.querySelector('#dht').textContent = 'No data from server'
                document.querySelector('#tilt').textContent = 'No data from server'
            }

        return data
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


