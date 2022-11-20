require('dotenv').config()
const router = require('express').Router();
const { Task, TaskGroup } = require('../database/models');
const { getUserFromToken } = require("../helpers");



/*
* POST /task/add/group
* Purpose: Create a task group
*/
router.post('/add/group', async (req, res) => {
    //TODO: grab user_id from the token ? 
    console.log(req.cookies);
    TaskGroup.create({
        user_id: req.body.user_id,
        name: req.body.name,
        category: req.body.category ?? ''
    }).then((response) => {
        if(response){
            return res.status(200).json({message: "Task group created successfully.", error: false, data: response});
        } else {
        }
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({message: err, error: true})
    })
});

router.post('/fetch/group', async (req, res) => {
    const user = getUserFromToken(req.body.token);
    console.log(user);
    if(user){
        TaskGroup.find({user_id: user._id}).then((response) => {
            if(response){
                return res.status(200).json({message: "Task Group fetched successfully.", error: false, data: response});
            }
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({message: err, error: true})
        })
    } else {
        return res.status(500).json({message: "Unable to identify user!", error: true})

    }
    })

router.post('/add/task', async (req, res) => {
    const user = getUserFromToken(req.body.token);
    console.log(user);
    if(user){
        Task.create({
            user_id: user._id,
            task_group_id: req.body.task_group_id,
            description: req.body.description,
            priority: req.body.priority,
            completed: req.body.completed ?? false,
            dueDate: req.body.dueDate ?? '',
            dateCreated: Date.now()
        }).then((response) => {
            if(response){
                return res.status(200).json({message: "Task created successfully.", error: false, data: response});
            }
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({message: err, error: true})
        })
    } else {
        return res.status(500).json({message: "Unable to identify user!", error: true})
    
    }
})

router.post('/fetch/task', async (req, res) => {
    const user = getUserFromToken(req.body.token);
    console.log(user);
    if(user){
        Task.find({user_id: user._id}).then((response) => {
            if(response){
                return res.status(200).json({message: "Tasks fetched successfully.", error: false, data: response});
            }
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({message: err, error: true})
        })
    } else {
        return res.status(500).json({message: "Unable to identify user!", error: true})

    }
    })



module.exports = router;