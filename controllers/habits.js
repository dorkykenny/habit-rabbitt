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

router.get('/:habitId', async (req, res) => {
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

router.put('/:habitId', async (req, res) => {
    try {
        const updatedHabit = await Habit.findByIdAndUpdate(req.params.habitId, 
            {   
                name: req.body.name,
                description: req.body.description,
                frequency: req.body.frequency,
                creator: req.body.creator
            },
            {new: true})
        if (!updatedHabit) {
            res.status(404)
            throw new Error('Habit not found.')
        }
        res.status(200).json(updatedHabit)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
})

router.delete('/:habitId', async (req, res) => {
    try {
        const deletedHabit = await findByIdAndDelete(req.params.habitId)
        if (!deletedHabit) {
            res.status(404)
            throw new Error('Habit not found.')
        }
        res.status(200).json(deletedHabit)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
})

module.exports = router