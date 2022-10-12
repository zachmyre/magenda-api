// Import model then add to exports

const { User } = require('./user.model')
const { Task, TaskGroup } = require('./task.model')
const mongoose = require('mongoose');


module.exports = {
    User,
   Task,
   TaskGroup,
    mongoose
};