const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET
    // Used when page renders
tasksRouter.get('/', (req, res) => {
    console.log('in tasksRouter GET')

    let queryText = `
        SELECT * FROM "tasks"
        ORDER BY "complete" ASC;`

    pool.query(queryText)
    .then( result => {
        console.log('tasksRouter get is running')
        res.send(result.rows)
    })
    .catch( error => {
        console.log('error in tasksRouter get', error)
        res.sendStatus(500)
    })
})

// POST
    // Connected to Submit button
tasksRouter.post('/', (req, res) => {
    console.log('in tasksRouter post')

    let newTask = req.body

    // Storing newTask properties in an array for readability in pool.query
    let taskPostArray = [newTask.task, newTask.complete]

    let queryText = `
    INSERT INTO "tasks" 
	("task", "complete");)
    VALUES ($1, $2); 
    `

    pool.query(queryText, taskPostArray)
    .then(result => {
        console.log('tasksRouter post is running')
        res.sendStatus(201)
    })
    .catch(error => {
        console.log('error in tasksRouter post', error)
        res.sendStatus(500)
    })
})

// PUT
    // Connected to npm sta Ready buttons
tasksRouter.put('/taskcomplete/:id', (req, res) => {
    console.log('in TasksRouter put')

    let taskId= req.params.id

    let isReady = 'true' // variable to send to table for updating task complete
    
    let queryParams = [isReady, taskId]
    let queryText = `
    
    UPDATE "tasks"
    SET "complete" = $1
    WHERE "id"= $2;`

    console.log(`Success connecting to /taskcomplete. taskId = ${taskId}`)
    pool.query(queryText, queryParams)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        }) 
})

// DELETE

tasksRouter.delete('/deletetask/:id', (req, res) => {
    let taskToDeleteID = req.params.id
    let queryText = 'DELETE FROM "tasks" WHERE "id"= $1;'

    pool.query(queryText, [taskToDeleteID])
    .then((result) => {
        console.log("Task deleted, id:", taskToDeleteID)
        res.sendStatus(200)
    })
        .catch((error) => {
            console.log('Error making database query', queryText)
            console.log('Error Message:', error)
            res.sendStatus(500)
        })
})


module.exports = tasksRouter;