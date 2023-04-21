//console.log("renderer.js loaded")

const { Server } = require('node-osc');

var oscServer = new Server(9699, '0.0.0.0', () => {
  console.log('OSC Server is listening');
  document.getElementById('osc_status').innerHTML="ON";
  document.getElementById('osc_status').style.color="green";
  document.getElementById('port_num').innerHTML=oscServer.port;
});

// oscServer.on('message', function (msg) {
//   console.log(`Message: ${msg}`);
//   if (msg[0].includes("gyro")){
//     console.log("The gyro message is: " + msg[1] + " " + msg[2] + " " + msg[3])
//   }
//   //oscServer.close();
// });



oscServer.on('bundle', function (bundle) {
    bundle.elements.forEach((element, i) => {
        if (element[0].includes("/gyrosc/gyro")){
            console.log(element);
            //console.log("The gyro message is: " + element[1] + " " + element[2] + " " + element[3])
            update_pan(element[1],element[2],element[3]);
        }
    //   console.log(`Timestamp: ${bundle.timetag[i]}`);
    //   console.log(`Message: ${element}`);
    });
    //oscServer.close();
  });


function update_pan(x,y,z){
    global_config.audio_config.audience_location.pitch = y;
    global_config.audio_config.audience_location.yaw = x;
    global_config.audio_config.audience_location.roll = z;

    document.getElementById('pitch').innerHTML=Math.round(y/Math.PI*180);
    document.getElementById('yaw').innerHTML=Math.round(x/Math.PI*180);
    document.getElementById('roll').innerHTML=Math.round(z/Math.PI*180);
    update_global_config();
}