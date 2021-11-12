const express = require('express');
const { getAllUseraction, getUserActivityDetails } = require('../controllers/useractionController');

const router = express.Router();

router.get('/userActivity', getAllUseraction);
router.get('/userActivityDetails', getUserActivityDetails);

module.exports = {
    routes: router
}