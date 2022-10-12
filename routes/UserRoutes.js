require('dotenv').config()
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, UserGroup, AccessCode } = require('../database/models');

const bcrypt = require('bcrypt');
const saltRounds = 12;
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
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err){
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
            });
        }
    })
});

/*
* POST /user/register
* Purpose: Create a new user
*/
router.post('/login', async (req, res) => {
    const { username, password} = req.body;
    User.findOne({username: username}).then((user) => {
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    const token = jwt.sign({ user: user}, JWT_KEY);
                            return res.status(200).json({message: "User logged in successfully", error: false, data: token});
                } else {
                    return res.status(400).json({message: "Invalid password.", error: true});
                }
            });
        } else {
            return res.status(400).json({message: "Invalid username.", error: true});
        }
    })
});


module.exports = router;