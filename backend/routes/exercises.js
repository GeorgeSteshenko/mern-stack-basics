const express = require('express');
const router = express.Router();

let Exercise = require('../models/exercise.model');
const { route } = require('./users');

router.get('/', async (req, res) => {
    // Exercise.find()
    //     .then(exercises => res.json(exercises))
    //     .catch(err => res.status(400).json('Error: ') + err);
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
})

router.post('/add', async (req, res) => {
    // const username = req.body.username;
    // const description = req.body.description;
    // const duration = Number(req.body.duration);
    // const date = Date.parse(req.body.date);

    // const newExercise = new Exercise({
    //     username,
    //     description,
    //     duration,
    //     date,
    // });

    // newExercise.save()
    //     .then(() => res.json('Exercise added.'))
    //     .catch(err => res.status(400).json('Error: ' + err));
    try {
        const username = req.body.username;
        const description = req.body.description;
        const duration = Number(req.body.duration);
        const date = Date.parse(req.body.date);

        const newExercise = new Exercise({
            username,
            description,
            duration,
            date,
        });

        await newExercise.save();
        res.json('Exercise added.');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        res.json(exercise)
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        res.json('Exercise deleted:' + exercise);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            {
                username: req.body.username,
                description: req.body.description,
                duration: Number(req.body.duration),
                date: Date.parse(req.body.date),
            },
            { new: true }
        ); 

        exercise.save();
        res.json('Exercise updated.');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

module.exports = router;