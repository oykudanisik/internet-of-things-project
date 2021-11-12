const { Mqtt } = require('../models/mqtt');

const homeView = async (req, res, next) => {
    if (req.session) {
        if (req.session.user) {
            const mqttData = await Mqtt.find({ mode:true }).exec();
            return res.render("home", { mqttData: mqttData,user: req.session.user });
        }
    }
    res.status(401).render('login', { error: 'Session expired, Please login.' })
}

const deviceHistory = async (req, res, next) => {
    if (req.session) {
        if (req.session.user) {
            const mqttData = await Mqtt.find().sort({date: -1}).limit(30).exec();
            //const mqttData = await Mqtt.find({ mode:true }).skip(Mqtt.collection.count()-50).exec();
            return res.render("devicehistory", { mqttData: mqttData.reverse(),user: req.session.user });
        }
    }
    res.status(401).render('login', { error: 'Session expired, Please login.' })
}
module.exports = {
    homeView,
    deviceHistory
}