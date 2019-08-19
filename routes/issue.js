const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');
const Counter = require('../models/counter')

router.get('/', (req, res) => {
    res.send('<h>Issue Submission Page</h>');
});

router.post('/', (req, res) => {
    // Create a new Issue document with the input data
    let newIssue =  new Issue({
        issue_number: 0,
        question_id: req.body.questionID,
        issue_type: req.body.issueType,
        issue_description: req.body.issueDescription
    });

    // Validate document requirements before going any further
    newIssue.validate((err) => {
        if (err) {
            console.log("Validation Failed: " + err);
            res.send(err);
        } else {
            // Retrieve and increment issue counter from database
            Counter.findOneAndUpdate({counter_type: "issue"}, { $inc: {sequence_value: 1}},
            (err, issueCounter) => {
                if (err) {
                    console.log('Error: ' + err);
                    res.send(err);
                } else {
                    // Assign issue id to new issue
                    newIssue.issue_number = issueCounter.sequence_value,
                    
                    // Save new issue document to the database
                    newIssue.save()
                        .then((result) => {
                            console.log(result);
                            res.send('Thank you for your issue submission!');
                        })
                        .catch((err) => {
                            console.log('Error: ' + err);
                            res.send(err);
                        });
                }
            });
        }
    });
});

module.exports = router;