const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    lastname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },   
    username: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = {
        firstname: Joi.string().min(3).max(50).required(),
        lastname: Joi.string().min(3).max(50).required(),
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;