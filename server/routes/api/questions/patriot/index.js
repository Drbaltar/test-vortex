const questionRouter = require('../question-router/question-router');

const { MultChoiceQuestion } = require('../../../../models/questions/patriot');
const objectConverter = require('../../../../src/database-interface/questions/object-converter/patriot-question');
const documentBuilder = require('../../../../src/database-interface/questions/question-document-builder/patriot/patriot');
const dbInterface = require('../../../../src/database-interface');

const patriotRouter = questionRouter(MultChoiceQuestion, objectConverter, documentBuilder);

/*------------------------Operations for Requesting Topic Categories-----------------------*/
// Route for getting the topic categories based on the gunnery table and subtask
patriotRouter.get('/topics', (req, res) => {
    // Check to see if the unit type, gunnery table and subtask was passed in
    if (req.query.unitType && req.query.table && req.query.subtask) {
        dbInterface.getTopicCategories(req.query.unitType, req.query.table, req.query.subtask, (err, queryResults) => {
            if (err) {
                res.status(500).send(err);
            } else {
                let allTopics = [];

                queryResults.forEach((collectionTopics) => {
                    let topicCategories = {};

                    if (collectionTopics.length !== 0) {
                        collectionTopics.forEach((element) => {
                            if(!(element.topic.major_category in topicCategories)) {
                                topicCategories[element.topic.major_category] = [element.topic.sub_category];
                            } else {
                                if (!(topicCategories[element.topic.major_category].includes(element.topic.sub_category))) {
                                    topicCategories[element.topic.major_category].push(element.topic.sub_category);
                                }
                            }
                        });
                    }

                    allTopics.push(topicCategories);
                });

                res.send(allTopics);
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

/*------------------------Operations for Requesting Questions per Subtask-----------------------*/
// Route for getting the number of questions based on each table/subtask
patriotRouter.get('/count', (req, res) => {
    // Check to see if the unit type and test type was passed in
    if (req.query.unitType && req.query.testType) {
        dbInterface.getNumQuestionsPerSubtask(req.query.unitType, req.query.testType, (err, queryResults) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(queryResults);
            }
        });
    } else {
        if (!req.query.unitType) {
            res.status(400).send('The \'Unit Type\' is required!');
        } else if (!req.query.testType) {
            res.status(400).send('The \'Test Type\' is required!');
        }
    }
});

// Route for getting all approved questions based on each table/subtask by unit/test type
patriotRouter.get('/subtask', (req, res) => {
    // Check to see if the unit type, test type, gunnery table and subtask was passed in
    if (req.query.unitType && req.query.testType && req.query.table && req.query.subtask) {
        dbInterface.getQuestionsPerSubtask(req.query.unitType, req.query.testType, req.query.table,
            req.query.subtask, (err, queryResults) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(queryResults);
                }
            });
    } else {
        if (!req.query.unitType) {
            res.status(400).send('The \'Unit Type\' is required!');
        } else if (!req.query.testType) {
            res.status(400).send('The \'Test Type\' is required!');
        } else if (!req.query.table) {
            res.status(400).send('The \'Gunnery Table\' is required!');
        } else if (!req.query.subtask) {
            res.status(400).send('The \'Table Subtask\' is required!');
        }
    }
});

module.exports = patriotRouter;