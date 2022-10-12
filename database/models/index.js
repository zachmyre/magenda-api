// Import model then add to exports

const { User } = require('./user.model')
const mongoose = require('mongoose');


module.exports = {
    User,
   
    mongoose
};