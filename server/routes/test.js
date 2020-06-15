const express = require('express');
const router = express.Router();

const patriotTestGen = require('../src/test generation/patriot-test-gen');

// Route for getting questions for a new patriot test with automatic selection of questions
router.get('/new-patriot-auto', (req, res) => {
    let unitType = req.query.unitType;
    let testType = req.query.testType;
    let testLevel = req.query.testLevel;
    let numberOfQuestions = req.query.numberOfQuestions;
    let alternateQuestions = (req.query.alternateQuestions ? req.query.alternateQuestions : 0);

    // Check to see if the unit type and test type parameters were passed in
    if (unitType && testType && testLevel && numberOfQuestions) {
        patriotTestGen.autoSelectQuestions(unitType, testType, testLevel, numberOfQuestions, 
            alternateQuestions, (err, queryResults) => {
                if (err) {
                    res.status(500).send(err);
                } else {
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