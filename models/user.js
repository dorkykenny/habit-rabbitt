const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
})

const user = mongoose.model('User', userSchema)

module.exports = user