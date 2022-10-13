require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;


function getUserFromToken(token){
    var user = null;
    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if(!err){
            console.log(decoded);
            user = decoded;
        }
      });
      return user;
}