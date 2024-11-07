const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const User = require('../models/User')
const Habit = require('../models/Habit');
const Progress = require('../models/Progress');

router.use(verifyToken)

router.post('/progress', async (req, res) => {
    const { habitId } = req.params
    const { userId } = req.user // get from token
    const { completed } = req.body

    try {
        const habit = await Habit.findById(habitId)
        if (!habit || habit.userId.toString() !== userId.toString()) {
            return res.status(404).json({message: 'Habit not found.'})
        }

        const progress = await Progress.create({
            habitId, 
            userId,
            date: new Date(),
            completed
        })

        res.status(200).json(progress)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
})

router.get('/progress', async (req, res) => {
    const { habitId } = req.params

    try {
        const progress = await Progress.find({ habitId })
        res.status(200).json(progress)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
})

module.exports = router