const express = require('express');
const router = express.Router();
const Issue = require('../../../models/issue');
const Counter = require('../../../models/counter');
const documentBuilder = require('../../../src/document-builder');

router.get('/', (req, res) => {
    res.send('<h>Issue Submission Page</h>');
});

router.post('/submit', (req, res) => {
    // Create a new Issue document with the input data
    let newIssue =  documentBuilder.buildIssueDocument(req);

    // Validate document requirements before going any further
    newIssue.validate((err) => {
        if (err) {
            console.log('Validation Failed: ' + err);
            res.status(400).send(err);
        } else {
            // Retrieve and increment issue counter from database
            Counter.findOneAndUpdate({counter_type: 'issue'}, { $inc: {sequence_value: 1}},
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

router.get('/get', (req, res) => {
    Issue.find({issue_number: req.body.issueNumber})
        .then((results) => {
            res.send(results);
        }).catch((err) => {
            console.log('Error: ' + err);
            res.status(404).send(err);
        });
});

router.get('/getAll', (req, res) => {
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

module.exports = router;