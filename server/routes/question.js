const express = require('express');
const router = express.Router();
const documentBuilder = require('../src/document-builder');
const dbInterface = require('../src/database-interface');

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
            // Save new Question document to the database
            newQuestion.save()
                .then((result) => {
                    console.log(result);
                    res.send('Thank you for your question submission!');
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                    res.status(500).send(err);
                });
        }
    });
});

// Route for approving a question and moving to the official question bank
router.post('/approve', (req, res) => {
    // Declare new question
    let approvedQuestion;

    // Find out what type of question is being submitted and build appropriate document
    switch (req.body.questionType) {
    case 'Multiple Choice':
        approvedQuestion = documentBuilder.buildMultQuestionDocument('approved', req);
        break;
    case 'True or False':
        approvedQuestion = documentBuilder.buildTFQuestionDocument('approved', req);
        break;
    case 'Fill-in-the-Blank':
        approvedQuestion = documentBuilder.buildFillBlankQuestionDocument('approved', req);
        break;
    default:
        res.status(400).send({message: 'The \'Question Type\' entry is not a valid entry'});
        return;
    }

    // Validate document requirements before going any further
    approvedQuestion.validate((err) => {
        if (err) {
            console.log('Validation Failed: ' + err);
            res.status(400).send(err);
        } else {
            // Save new Question document to the database
            approvedQuestion.save()
                .then((result) => {
                    console.log(result);
                    res.send('The question has been added to the question bank! The question can be referenced by the following value: ' + result._id);
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                    res.status(500).send(err);
                });
        }
    });
});

// Route for updating a pending question without moving it to the approved library bank
router.post('/update-pending', (req, res) => {
    const gunneryTableEntries = req.body.gunneryTable.map((entry) => {
        return({
            unit_type: entry.unitType,
            test_type: entry.testType,
            table: entry.table,
            subtask: entry.subtask
        });
    });

    let updatedQuestion= {
        question_type: req.body.questionType,
        question_description: req.body.questionDescription,
        answer_a: req.body.answerA,
        answer_b: req.body.answerB,
        answer_c: req.body.answerC,
        correct_answer: req.body.correctAnswer,
        gunnery_table: gunneryTableEntries,
        topic: req.body.topic
    };

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
    updatedQuestion.validate((err) => {
        if (err) {
            console.log('Validation Failed: ' + err);
            res.status(400).send(err);
        } else {
            // Save new Question document to the database
            approvedQuestion.save()
                .then((result) => {
                    console.log(result);
                    res.send('The question has been added to the question bank! The question can be referenced by the following value: ' + result._id);
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                    res.status(500).send(err);
                });
        }
    });
});

// Route for getting questions that were submitted and are pending approval
router.get('/pending', (req, res) => {
    dbInterface.getAllPendingQuestions((err, queryResults) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(queryResults);
        }
    });
});

module.exports = router;