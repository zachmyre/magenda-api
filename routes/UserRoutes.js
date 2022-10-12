require('dotenv').config()
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, UserGroup, AccessCode } = require('../database/models');

const bcrypt = require('bcryptjs');
const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);
const JWT_KEY = process.env.JWT_KEY;


/*
* POST /user/register
* Purpose: Create a new user
*/
router.post('/register', async (req, res) => {
    const { username, email, password} = req.body;
    User.findOne({username: username}).then((user) => {
        if(user){
            console.log(user);
            return res.status(400).json({message: "Username already exists.", error: true});
        } else {
            const hash = bcrypt.hashSync(password, salt);
                if(!hash){
                    return res.status(400).json({message: err, error: true});
                } else {
                    User.create({email: email, username: username, password: hash}).then((user) => {
                        if(user){
                            const token = jwt.sign({ user: user}, JWT_KEY);
                            return res.status(200).json({message: "User created successfully", error: false, data: token});
                        } else {
                            return res.status(400).json({message: "Error creating user.", error: true});
                        }
                    })
                }
        }
    })
});

/*
* POST /user/login
* Purpose: Validates a user's credentials and returns a token
*/
router.post('/login', async (req, res) => {
    console.log(req.cookies);
    const { username, password} = req.body;
    User.findOne({username: username}).then((user) => {
        if(user){
            const isPassword = bcrypt.compare(password, user.password);
                if(isPassword){
                    const token = jwt.sign({ user: user}, JWT_KEY);
                            return res.status(200).json({message: "User logged in successfully", error: false, data: token});
                } else {
                    return res.status(400).json({message: "Invalid password.", error: true});
                }
        } else {
            return res.status(400).json({message: "Invalid username.", error: true});
        }
})
});


module.exports = router;