require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET || 'shh'
module.exports = {
    JWT_SECRET: jwtSecret
} 