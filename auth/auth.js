const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const authCookies = req.cookies;
    if (!authCookies) {
        return res.sendStatus(401);
    } 

    const accessTokenSecret = ssl_config.cert;
    if(!authCookies.access_token){
        return res.sendStatus(401);
    }

    try{
        jwt.verify(authCookies.access_token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user.data;
            next();
        })
    } catch (err) {
        console.log('error', err);
        return res.sendStatus(500);
    }
    
};


exports.authenticateJWT = authenticateJWT;