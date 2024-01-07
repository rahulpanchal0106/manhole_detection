#include <Wire.h>
#include <Adafruit_ADXL345_U.h>
#include <Adafruit_Sensor.h>
#include <WiFi.h>
#include <HTTPClient.h>

// For My Home WiFi
#define LOCAL_SSID "Open Sesame 2.4G"
#define LOCAL_PWD "true4#copy"
#define apiUrl "https://iot-based-manhole-detection.onrender.com/sensordata"

double x_out, y_out, z_out;
double roll, pitch = 0.00;

char jsonOutput[2048];

/* Assign a unique ID to this sensor at the same time */
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

void displaySensorDetails(void)
{
  sensor_t sensor;
  accel.getSensor(&sensor);
  Serial.println("------------------------------------");
  Serial.print  ("Sensor:       "); Serial.println(sensor.name);
  Serial.print  ("Driver Ver:   "); Serial.println(sensor.version);
  Serial.print  ("Unique ID:    "); Serial.println(sensor.sensor_id);
  Serial.print  ("Max Value:    "); Serial.print(sensor.max_value); Serial.println(" m/s^2");
  Serial.print  ("Min Value:    "); Serial.print(sensor.min_value); Serial.println(" m/s^2");
  Serial.print  ("Resolution:   "); Serial.print(sensor.resolution); Serial.println(" m/s^2"); 
  Serial.println("------------------------------------");
  Serial.println("");
  delay(500);
}

void displayDataRateAndRange(void)
{
  Serial.print  ("Data Rate: 3200 Hz"); 
  Serial.print ("\nRange: +/- 16 g\n\n");
}

void setup(void) 
{
  Serial.begin(115200);
  Serial.println("\n\nAccelerometer Test"); 
  Serial.println("");
  
  /* Initialise the sensor */
  if(!accel.begin())
  {
    /* There was a problem detecting the ADXL345 ... check your connections */
    Serial.println("Ooops, no ADXL345 detected ... Check your wiring!");
    while(1);
  }

  /* Set the range to whatever is appropriate for your project */
  accel.setRange(ADXL345_RANGE_16_G);
  // accel.setRange(ADXL345_RANGE_8_G);
  // accel.setRange(ADXL345_RANGE_4_G);
  // accel.setRange(ADXL345_RANGE_2_G);
 
  accel.setDataRate(ADXL345_DATARATE_3200_HZ);
  
  /* Display some basic information on this sensor */
  displaySensorDetails();
  displayDataRateAndRange();
  Serial.println("");
  
  WiFi.begin(LOCAL_SSID, LOCAL_PWD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(100);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void loop(void) 
{
  sensors_event_t event; 
  accel.getEvent(&event);
  
  x_out = event.acceleration.x;
  y_out = event.acceleration.y;
  z_out = event.acceleration.z;

  // Calculate Roll and Pitch (rotation around X-axis, rotation around Y-axis)
  roll = atan(y_out / sqrt(pow(x_out, 2) + pow(z_out, 2))) * 180 / PI;
  pitch = atan(-1 * x_out / sqrt(pow(y_out, 2) + pow(z_out, 2))) * 180 / PI;

  Serial.print("Pitch Angle: "); Serial.print(pitch); Serial.print("  ");
  Serial.print("Roll Angle: "); Serial.print(roll); Serial.print("  ");
  Serial.print("X: "); Serial.print(x_out); Serial.print("  ");
  Serial.print("Y: "); Serial.print(y_out); Serial.print("  ");
  Serial.print("Z: "); Serial.print(z_out); Serial.print("  ");
  Serial.println("m/s^2 ");
  delay(100);

  // Convert accelerometer data to strings
  String x_outStr = String(x_out);
  String y_outStr = String(y_out);
  String z_outStr = String(z_out);
  String pitchStr = String(pitch);
  String rollStr = String(roll);
  
  String jsonPayload = "{\"tilt\":{\"pitch\":" + pitchStr + ",\"roll\":" + rollStr + "}}";

  HTTPClient http;
  http.begin(apiUrl);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) 
  {
    String response = http.getString();
    Serial.println("HTTP Response: " + response);
  } 
  else 
  {
    Serial.println("HTTP Request failed");
  }
  
  http.end();
  delay(100);
}