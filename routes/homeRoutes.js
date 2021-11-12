const express = require('express');
const { homeView, deviceHistory } = require('../controllers/homeController');
const { getAutomaticMqtt } = require('../controllers/mqttController');


const router = express.Router();

router.get('/', homeView);
router.get('/devicehistory', deviceHistory);


module.exports = {
    routes: router
}