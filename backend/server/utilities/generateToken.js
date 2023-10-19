const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userId,username,displayName, email, password, ifpa ) => {
    return jwt.sign({id: userId ,username,displayName, email,  password,ifpa},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'1m'
    })
 }

module.exports.generateAccessToken = generateAccessToken