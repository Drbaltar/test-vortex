const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

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
router.put('/update-pending', (req, res) => {
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
            // Convert the variables to the database naming scheme
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
            question.correct_answer = req.body.correctAnswer;
            question.answer_a = req.body.answerA;
            question.answer_b = req.body.answerB;
            question.answer_c = req.body.answerC;
            question.gunnery_table = gunneryTableEntries;
            question.topic = {
                major_category: req.body.topic.majorCategory,
                sub_category: req.body.topic.subCategory
            };
        
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
router.post('/delete-pending', (req, res) => {
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
        res.status(400).send('The \'Question ID\' is required!');
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

// Route for getting existing question with the input ID
router.get('/search', (req, res) => {
    let questionID = req.query._id;

    // Check to see if the ID parameter was passed in and that it is a valid Object ID
    if (questionID && ObjectId.isValid(questionID)) {
        dbInterface.getExistingQuestion(questionID, (err, queryResults) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(queryResults);
            }
        });
    } else {
        if (!questionID) {
            res.status(400).send('The \'Question ID\' is required!');
        } else {
            res.status(400).send('The \'Question ID\' input is not a valid Object ID value!');
        }
    }
});

// Route for updating an existing question
router.put('/update', (req, res) => {
    // Declare and initialize the valid types of questions that are possible to be input
    const validQuestionTypes = ['Multiple Choice', 'True or False', 'Fill-in-the-Blank'];

    // Check that the data input has a valid question type and return error if it doesn't
    if (!validQuestionTypes.includes(req.body.questionType)) {
        res.status(400).send({message: 'The \'Question Type\' entry is not a valid entry'});
        return;
    }

    // Retrieve the document for the question ID in the POST request
    dbInterface.getExistingQuestionForUpdate(req.body._id, req.body.questionType, (err, question) => {
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
            question.correct_answer = req.body.correctAnswer;
            question.answer_a = req.body.answerA;
            question.answer_b = req.body.answerB;
            question.answer_c = req.body.answerC;
            question.gunnery_table = gunneryTableEntries;
            question.topic = {
                major_category: req.body.topic.majorCategory,
                sub_category: req.body.topic.subCategory
            };
        
            // Validate document requirements before going any further
            question.validate((err) => {
                if (err) {
                    console.log('Validation Failed: ' + err);
                    res.status(400).send(err);
                } else {
                    // Save new Question document to the database
                    question.save()
                        .then((result) => {
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

// Route for deleting existing question with the input ID
router.delete('/delete', (req, res) => {
    let questionID = req.query._id;

    // Check to see if the ID parameter was passed in and that it is a valid Object ID
    if (questionID && ObjectId.isValid(questionID)) {
        dbInterface.deleteExistingQuestion(questionID, (err, queryResults) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (queryResults) {
                    res.send('The question was sucessfully deleted!');
                } else {
                    res.status(404).send('The question to delete was not found!');
                }
            }
        });
    } else {
        if (!questionID) {
            res.status(400).send('The \'Question ID\' is required!');
        } else {
            res.status(400).send('The \'Question ID\' input is not a valid Object ID value!');
        }
    }
});

/*------------------------Operations for Requesting Topic Categories-----------------------*/
// Route for getting the topic categories based on the gunnery table and subtask
router.get('/topics', (req, res) => {
    // Check to see if the unit type, gunnery table and subtask was passed in
    if (req.query.unitType && req.query.table && req.query.subtask) {
        dbInterface.getTopicCategories(req.query.unitType, req.query.table, req.query.subtask, (err, queryResults) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (queryResults.length !== 0) {
                    let topicCategories = {};

                    queryResults.forEach((element) => {
                        if(!(element.topic.major_category in topicCategories)) {
                            topicCategories[element.topic.major_category] = [element.topic.sub_category];
                        } else {
                            if (!(topicCategories[element.topic.major_category].includes(element.topic.sub_category))) {
                                topicCategories[element.topic.major_category].push(element.topic.sub_category);
                            }
                        }
                    });

                    res.send(topicCategories);
                } else {
                    res.send({});
                }
            }
        });
    } else {
        if (!req.query.unitType) {
            res.status(400).send('The \'Unit Type\' is required!');
        } else if (!req.query.table) {
            res.status(400).send('The \'Gunnery Table\' is required!');
        } else if (!req.query.subtask){
            res.status(400).send('The \'Gunnery Subtask\' is required!');
        }
    }
});

module.exports = router;