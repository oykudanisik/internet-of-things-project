//const {addMqttData}  = require('../controllers/mqttController');
const { Mqtt } = require('../models/mqtt');

var pubTopic = "controller/settings";
var subTopic = "controller/status";

var mqtt    = require('mqtt');
var mqttClient  = mqtt.connect("mqtt://127.0.0.1:1883",{clientId:subTopic});

mqttClient.on("connect",function(){	        
    mqttClient.subscribe(subTopic);
    console.log('Mqtt connected successfuly...');
});

mqttClient.on('message',async function(topic, message, packet){
    let msg = JSON.parse(message);
    let mqtt = await new Mqtt({
        pressure: msg.pressure,
        speed: msg.speed,
        mode: msg.auto,
        date: Date()
    });
    await mqtt.save();
    //await addMqttData(JSON.parse(message));
    broadcastMessage(JSON.stringify({
          pressure: msg.pressure, 
          speed: msg.speed
    }));
});

var sendSettings = ( settings ) => {
    mqttClient.publish(pubTopic,settings);
}

//WEB SOCKET
const  {WebSocket, WebSocketServer} = require('ws');
//const {sendSettings} = require("./mqtt");

const wss =  new WebSocketServer({port:3001});
console.log("WebSockets created...");

wss.on('connection', async (ws) => {
    console.log("Client connected...");
    ws.on('message', async (message) => {
        // TODO: Send config message to MQTT topic
        console.log(`Received message: ${message}`);
        sendSettings(message);
        //broadcastMessage(message);
    });
  });

const broadcastMessage = (message) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    })
}

// module.exports = {
//     wss,
//     broadcastMessage
// }
// module.exports =  {
//     sendSettings
// }