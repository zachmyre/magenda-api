const mongoose = require('mongoose');

const TaskGroupSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    }
});

const TaskSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    task_group_id: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    dueDate: {
        type: Date,
        required: false,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const TaskGroup = mongoose.model('TaskGroup', TaskGroupSchema);
const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task, TaskGroup };