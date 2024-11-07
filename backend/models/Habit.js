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
        enum: ['Daily', 'Weekly', 'Fortnightly', 'Monthly']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        // required: true
    },
    addedByUsers: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'}]

    }, {timestamps: true})

const Habit = mongoose.model('Habit', habitSchema)

module.exports = Habit