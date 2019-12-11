const express = require('express');
const router = express.Router();
const documentBuilder = require('../src/document-builder');
const dbInterface = require('../src/database-interface');

/*------------------------CRUD Operations for 'Pending' Questions-----------------------*/

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

// Route for updating a pending question without moving it to the approved library bank
router.post('/update-pending', (req, res) => {
    // Declare and initialize the valid types of questions that are possible to be input
    const validQuestionTypes = ['Multiple Choice', 'True or False', 'Fill-in-the-Blank'];

    // Check that the data input has a valid question type and return error if it doesn't
    if (!validQuestionTypes.includes(req.body.questionType)) {
        res.status(400).send({message: 'The \'Question Type\' entry is not a valid entry'});
        return;
    }

    // Retrieve the document for the question ID in the POST request
    dbInterface.getPendingQuestion(req.body._id, req.body.questionType, (err, question) => {
        if (err) {
            console.log('Error: ' + err);
            res.status(400).send(err);
        } else {
            const gunneryTableEntries = req.body.gunneryTable.map((entry) => {
                return({
                    unit_type: entry.unitType,
                    test_type: entry.testType,
                    table: entry.table,
                    subtask: entry.subtask
                });
            });
        
            question.question_type = req.body.questionType;
            question.question_description = req.body.questionDescription;
            question.answer_a = req.body.answerA;
            question.answer_b = req.body.answerB;
            question.answer_c = req.body.answerC;
            question.correct_answer = req.body.correctAnswer;
            question.gunnery_table = gunneryTableEntries;
            question.topic = req.body.topic;
        
            // Validate document requirements before going any further
            question.validate((err) => {
                if (err) {
                    console.log('Validation Failed: ' + err);
                    res.status(400).send(err);
                } else {
                    // Save new Question document to the database
                    question.save()
                        .then((result) => {
                            console.log(result);
                            res.send('The question has been updated! The question can be referenced by the following value: ' + result._id);
                        })
                        .catch((err) => {
                            console.log('Error: ' + err);
                            res.status(500).send(err);
                        });
                }
            });
        }
    });
});

// Route for deleting questions that were submitted and are pending approval
router.delete('/delete-pending', (req, res) => {
    const previousQuestionId = req.body._id;

    if (previousQuestionId) {
        dbInterface.deletePendingQuestion(previousQuestionId, (err, response) => {
            if (err) {
                res.status(500).send(`Error: ${err}`);
            } else {
                if (response) {
                    res.status(200).send('The question has been deleted from the pending question database!');
                } else {
                    res.status(400).send('The \'Question ID\' provided was not found in the pending question database!');
                }
            }
        });
    } else {
        res.status(400).send('The \'Question\' ID is required!');
    }
});

/*------------------------CRUD Operations for 'Approved' Questions-----------------------*/

// Route for approving a question and moving to the official question bank
router.post('/approve', (req, res) => {
    // Declare new question
    const previousQuestionId = req.body._id;
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
                    dbInterface.deletePendingQuestion(previousQuestionId, (err, response) => {
                        if (err) {
                            res.send(`The question has been added to the question bank! The question can be referenced by the following value: ${result._id}.\n` + 
                                `However, the 'pending question' version of the question could not be removed! Please remove it manually.\n${err}`);
                        } else {
                            console.log(`Deleted the following entry: ${response}`);
                            res.send(`The question has been added to the question bank! The question can be referenced by the following value: ${result._id}`);
                        }
                    });
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                    res.status(500).send(err);
                });
        }
    });
});

module.exports = router;