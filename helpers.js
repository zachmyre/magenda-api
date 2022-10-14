require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;


function getUserFromToken(token){
    var user = null;
    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if(!err){
            user = decoded;
        }
      });
      return user;
}

module.exports = { getUserFromToken }