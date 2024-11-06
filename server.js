const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./controllers/auth')
const habitsRouter = require('./controllers/habits')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors())
app.use(express.json())
app.use('/users', authRouter)
app.use('/habits', habitsRouter)


// Routes go here



app.listen(process.env.PORT, () => {
    console.log('The express app is ready!');
});