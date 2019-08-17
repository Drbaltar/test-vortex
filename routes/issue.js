const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');

router.get('/', (req, res) => {
    res.send('<h>Issue Submission Page</h>');
});

router.post('/', (req, res) => {
    let newIssue =  new Issue({
        question_id: req.body.questionID,
        issue_type: req.body.issueType,
        issue_description: req.body.issueDescription
    });
    
    newIssue.save()
        .then((result) => {
            console.log(result);
            res.send("Thank you for your issue submission!");
        })
        .catch((error) => {
            console.log("Error: " + error);
            res.send(error)
        });
});

module.exports = router;