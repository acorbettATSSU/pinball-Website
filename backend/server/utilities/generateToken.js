const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userId,displayName, email, username, password, ifpa ) => {
    return jwt.sign({id: userId ,displayName,username, email,  password,ifpa},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'1m'
    })
 }

module.exports.generateAccessToken = generateAccessToken