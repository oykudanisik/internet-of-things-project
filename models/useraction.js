const mongoose = require('mongoose');
const Joi = require('joi');

const useractionSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const Useraction = mongoose.model('Useraction', useractionSchema);

const validateUseraction = (useraction) => {
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        date: Joi.string().required(),
    }

    return Joi.validate(useraction, schema);
}

module.exports.Useraction = Useraction;
module.exports.validateUseraction = validateUseraction;