const express = require('express');
const router = express.Router();
// const Counter = require('../models/counter');
const documentBuilder = require('../src/document-builder');

router.get('/', (req, res) => {
    res.send('<h>Question Submission Page</h>');
});

// Route for submitting a new question for approval
router.post('/submit', (req, res) => {
    // Declare new question
    let newQuestion;

    // Find out what type of question is being submitted and build appropriate document
    switch (req.body.questionType) {
    case 'Multiple Choice':
        newQuestion = documentBuilder.buildMultQuestionDocument('pending', req);
        break;
    case 'True or False':
        newQuestion = documentBuilder.buildTFQuestionDocument('pending', req);
        break;
    case 'Fill-in-the-Blank':
        newQuestion = documentBuilder.buildFillBlankQuestionDocument('pending', req);
        break;
    default:
        res.status(400).send({message: 'The \'Question Type\' entry is not a valid entry'});
        return;
    }

    // Validate document requirements before going any further
    newQuestion.validate((err) => {
        if (err) {
            console.log('Validation Failed: ' + err);
            res.status(400).send(err);
        } else {
            // Save new MultQuestion document to the database
            newQuestion.save()
                .then((result) => {
                    console.log(result);
                    res.send('Thank you for your question submission!');
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                    res.send(err);
                });
        }
    });
});

module.exports = router;