const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({message: 'You need to be logged in to access that page.'})
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message: 'Invalid authorization token.'})
    }
}

module.exports = verifyToken