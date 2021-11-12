const { Useraction } = require('../models/useraction');

const getAllUseraction = async (req, res, next) => {
    if (req.session) {
        if (req.session.user) {
            const userActivity = await Useraction.aggregate([{ "$group": { _id: "$username", count: { $sum: 1 } } }])
            if (userActivity.length > 0) {
                console.log(userActivity)
                res.render('userActivity', { userActivity: userActivity });
                return;
            }

            return res.render('userActivity', { error: 'ERROR' });
        }
    }
    res.status(401).render('login', { error: 'Session expired, Please login.' })

}

const getUserActivityDetails = async (req, res, next) => {
    if (req.session) {
        if (req.session.user) {
            var username = req.query.username;
            const userActivity = await Useraction.find({ username }).sort({ date: -1 }).exec();
            return res.render("userActivityDetails", { activity: userActivity });
        }
    }

    res.status(401).render('login', { error: 'Session expired, Please login.' })
}

module.exports = {
    getAllUseraction,
    getUserActivityDetails,
}