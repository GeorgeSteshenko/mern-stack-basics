const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get(async (req, res) => {
    // User.find()
    //     .then(users => res.json(users))
    //     .catch(err => res.status(400).json('Error: ' + err));
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    };
});

router.route('/add').post(async (req, res) => {
    // const username = req.body.username;

    // const newUser = new User({username});

    // newUser.save()
    //     .then(() => res.json('User added.'))
    //     .catch(err => res.status(400).json('Error: ' + err));
    try {
        const username = req.body.username;

        const newUser = new User({username});

        await newUser.save();
        res.json('User added.')
    } catch (error) {
        res.status(400).json('Error: ' + error);
    };
});

module.exports = router;