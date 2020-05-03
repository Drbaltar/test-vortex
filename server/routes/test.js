const express = require('express');
const router = express.Router();

// const documentBuilder = require('../src/document-builder');
const dbInterface = require('../src/database-interface');

// Route for getting questions for a new patriot test with automatic selection of questions
router.get('/new-patriot-auto', (req, res) => {
    let unitType = req.query.unitType;
    let testType = req.query.testType;
    let testLevel = req.query.testLevel;
    let numberOfQuestions = req.query.numberOfQuestions;

    // Check to see if the unit type and test type parameters were passed in
    if (unitType && testType && testLevel && numberOfQuestions) {
        dbInterface.getExistingQuestionsByCategory(unitType, testType, (err, queryResults) => {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(queryResults);
                
                res.send(queryResults);
            }
        });
    } else {
        if (!unitType) {
            res.status(400).send('The \'Unit Type\' is required!');
        } else if (!testType) {
            res.status(400).send('The \'Test Type\' is required');
        } else if (!testLevel) {
            res.status(400).send('The \'Test Level\' is required');
        } else if (!numberOfQuestions) {
            res.status(400).send('The \'Number of Questions\' is required');
        }
    }
});

module.exports = router;