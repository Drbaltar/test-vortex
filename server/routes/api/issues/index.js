/*
*  This module serves as the index for all 'Issues' API routes 
*  Author: Kyle McCain
*  Date: 17 August 2020
*/

// Create primary router for the all 'Issues' API routes
const IssuesAPIRouter = require('express').Router();

// 
const Issue = require('../../../models/issue');

IssuesAPIRouter.post('/submit', require('./submit'));

IssuesAPIRouter.get('/get', (req, res) => {
    Issue.find({issue_number: req.body.issueNumber})
        .then((results) => {
            res.send(results);
        }).catch((err) => {
            console.log('Error: ' + err);
            res.status(404).send(err);
        });
});

IssuesAPIRouter.get('/getAll', (req, res) => {
    Issue.find().then((results) => {
        res.send(results);
    }).catch((err) => {
        console.log('Error: ' + err);
        res.status(404).send(err);
    });
});

// router.post('/delete', (req, res) => {
//     Issue.find.then((results) => {
//         res.send(results);
//     }).catch((err) => {
//         console.log('Error: ' + err);
//         res.status(404).send(err);
//     });
// });

// Export Issues API router
module.exports = IssuesAPIRouter;