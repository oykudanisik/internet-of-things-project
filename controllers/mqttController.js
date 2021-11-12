const { Mqtt } = require('../models/mqtt');
const {sendSettings} = require('../startup/mqtt');

const addMqttData = async (message) => {
    let mqtt = await new Mqtt({
        pressure: message.pressure,
        speed: message.speed,
        mode: message.auto,
        date: Date()
    });
    await mqtt.save();
}
const getAutomaticMqtt = async (req, res, next) => {
    // console.log("okey")
    // if (req.session) {
    //     if (req.session.user) {
    //         const mqttData = await Mqtt.find({ mode:true }).exec();
    //         console.log(mqttData);
    //         return res.render("home", { mqttData: mqttData });
    //     }
    // }
}
module.exports={
    addMqttData,
    getAutomaticMqtt
}
