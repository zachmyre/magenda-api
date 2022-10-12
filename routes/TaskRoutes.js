require('dotenv').config()
const router = require('express').Router();
const { Task, TaskGroup } = require('../database/models');



/*
* POST /task/add/group
* Purpose: Create a task group
*/
router.post('/add/group', async (req, res) => {
    //TODO: grab user_id from the token ? 
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

router.post('/add/task', async (req, res) => {
    return res.status(500).json({message: '', error: true})
})


module.exports = router;