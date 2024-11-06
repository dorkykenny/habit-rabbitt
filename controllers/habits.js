const express = require('express');
const router = express.Router();

const Habit = require('../models/Habit');

router.post('/', async (req, res) => {
    try {
        const createdHabit = await Habit.create({
            name: req.body.name,
            description: req.body.description,
            frequency: req.body.frequency,
            creator: req.body.creator
        })
        res.status(201).json(createdHabit)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const foundHabits = await Habit.find()
        if (!foundHabits) {
            return res.status(404).json({ message: 'No habits found.' })
        }

        res.status(200).json(foundHabits)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/habitId', async (req, res) => {
    try {
        const foundHabit = await Habit.findById(req.params.habitId)
        if (!foundHabit) {
            res.status(404)
            throw new Error('Habit not found.')
        }
        res.status(200).json(foundHabit)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
})

