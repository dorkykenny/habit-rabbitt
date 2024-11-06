const mongoose = require('mongoose')

const habitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'fortnightly', 'monthly']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
})

const Habit = mongoose.model('Habit', habitSchema)

module.exports = Habit