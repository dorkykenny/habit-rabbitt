const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require ('jsonwebtoken')
const SALT_ROUND = 12

router.post('/register', async (req, res) => {
    const { username, password } = req.body

    const userExists = await User.findOne({ username })
    
    try {

        if (userExists) {
            return res.status(400).json({
                message: `The username ${username} is already taken.`
            })
        }
        
        const newUser = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(password, SALT_ROUND)
        })
        
        const token = jwt.sign({username, userId: newUser._id}, process.env.JWT_SECRET)
        res.status(201).json({ token })

    } catch (error) {
        res.status(500).json({message: 'Server error.'})
    }

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const foundUser = await User.findOne({ username })

        if (!foundUser) {
            return res.status(400).send(`No account with the username ${username} found.`)
        }

        if (bcrypt.compareSync(password, foundUser.hashedPassword)) {
            const token = jwt.sign(
                {username, userId: foundUser._id},
                process.env.JWT_SECRET)
            res.status(200).json({ token })
        } else {
            res.status(401).json({
                message: 'Invalid username or password.'
            })
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})