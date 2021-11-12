const winston = require('winston');
const { User, validate } = require('../models/user');
const { Useraction } = require('../models/useraction');

const crypto = require('crypto');
const salt = 'iotcourse';

const loginUser = async (req, res, next) => {
    const userInfo = req.body;
    const hashedPwd = EncryptPassword(userInfo.password);
    const user = await User.find({ 'username': userInfo.username, 'password': hashedPwd }).exec();

    if (user.length > 0) {
        await addUseraction(userInfo.username);
        req.session.user = user;
        res.redirect('/');
        return;
    }

    winston.info('User can not login: ');
    res.render('login', { error: 'Invalid username or password' });
}

const signupView = async (req, res, next) => {
    res.render('signup');
}

const logoutUser = async (req, res, next) => {
    req.session.destroy();
    res.render('login', { error: '' });
}
const addUser = async (req, res, next) => {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    console.log(data);
    const hashedPwd = EncryptPassword(data.password);
    console.log("HashedPwd:" + hashedPwd);
    let user = await new User({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        password: hashedPwd
    });
    user = await user.save();
    res.redirect('/');
}

const addUseraction = async (username) => {
    let useraction = await new Useraction({
        username: username,
        date: new Date(),
    });
    useraction = await useraction.save();
}

function EncryptPassword(password) {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}
function manual(req, res, next){
    if (req.session) {
        if (req.session.user) {
            res.render('manual');
        }
    }
    res.status(401).render('login', { error: 'Session expired, Please login.' })
}
function userManual(req, res, next){
    if (req.session) {
        if (req.session.user) {
            res.render('userManual');
        }
    }
    res.status(401).render('login', { error: 'Session expired, Please login.' })
}
function downloadUserManual(req, res, next){
    res.download("userManual/UserManual.pdf");
}

module.exports = {
    loginUser,
    logoutUser,
    addUser,
    signupView,
    manual,
    userManual,
    downloadUserManual
}