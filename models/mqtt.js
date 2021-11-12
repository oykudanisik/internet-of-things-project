const mongoose = require('mongoose');
const Joi = require('joi');

const mqttSchema = new mongoose.Schema({
    pressure: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    mode: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const Mqtt = mongoose.model('Mqtt', mqttSchema);

// const validateMqtt = (Mqtt) => {
//     const schema = {
//         pressure: Joi.number().required(),
//         speed: Joi.number().required(),
//         mode: Joi.boolean().required(),
//         date: Joi.string().required(),
//     }

//     return Joi.validate(Mqtt, schema);
// }

module.exports.Mqtt = Mqtt;
