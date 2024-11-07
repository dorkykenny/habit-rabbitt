const mongoose = require('mongoose')

const progressSchema = mongoose.Schema({
    habitId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Habit',
        // required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        // required: true
    },
    date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

const Progress = mongoose.model('Progress', progressSchema)

module.exports = Progress