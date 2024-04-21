const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(50, 2 / 1, 0.1, 1000);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 300);

const rendered_obj = renderer.domElement;
rendered_obj.style.width = "80vw";

const lidContainer = document.querySelector('.lid-container');
lidContainer.appendChild(rendered_obj);

const geometry = new THREE.CylinderGeometry(30, 30, 5, 100);
const material = new THREE.MeshPhongMaterial({
    color: '#0d6efd',
    shininess: 100
});

const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);

// Establish WebSocket connection with server
const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('sensorData', (data) => {
    update3DModel(data);
});

function update3DModel(data) {
    if (data) {
        var pitch = data.tilt.pitch;
        var roll = data.tilt.roll;
        var yaw = 0;
        var temperature = data.dht.temperature;
        var humidity = data.dht.humidity;

        const pitchRadians = THREE.MathUtils.degToRad(pitch);
        const rollRadians = THREE.MathUtils.degToRad(roll);
        yaw = Math.atan2(Math.sin(rollRadians), Math.cos(pitchRadians) * Math.cos(rollRadians));
        const yawRadians = THREE.MathUtils.degToRad(yaw);

        cylinder.rotation.x = rollRadians;
        cylinder.rotation.y = yawRadians;
        cylinder.rotation.z = pitchRadians;
        renderer.render(scene, camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getData();
    setInterval(getData, 2000);
});

async function getData() {
    await fetch('/sensordata')
        .then((res) => res.json())
        .then((data) => {
            return update3DModel(data);
        })
        .catch((err) => {
            console.log('Error fetching sensor data\n', err);
        });
}

// Functions to handle alerts and update the UI can be kept as is
function getAlerts() {
    return Math.random() > 0.8 ? ['Manhole Overflow', 'High Gas Level'] : [];
}

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
