const express = require('express');
const router = express.Router();

const patriotTestGen = require('../../../src/test generation/patriot-test-gen');
const Test = require('../../../models/patriot/test');

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
            res.status(400).send('The \'Unit Type\' is required');
        } else if (!testType) {
            res.status(400).send('The \'Test Type\' is required');
        } else if (!testLevel) {
            res.status(400).send('The \'Test Level\' is required');
        } else if (!numberOfQuestions) {
            res.status(400).send('The \'Number of Questions\' is required');
        }
    }
});


// Route for saving a newly created test
router.post('/save-new', (req, res) => {
    // Declare new test
    let newTest = new Test(req.body);

    if (req.user) {
        newTest.created_by = req.user.username;
    }
    
    // Validate test requirements before going any further
    newTest.validate((err) => {
        if (err) {
            console.log('Validation Failed: ' + err);
            res.status(400).send(err);
        } else {
            // Save new Question document to the database
            newTest.save()
                .then((result) => {
                    console.log(result);
                    res.send('The test has been successfully saved!');
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                    res.status(500).send(err);
                });
        }
    });
});

// Route for receiving all tests created by the user that is currently logged in
router.get('/user-tests-full', (req, res) => {    
    if (req.user) {
        Test.find({created_by: req.user.username}).populate('versions.questions.question')
            .then(doc => res.send(doc))
            .catch(err => res.status(400).send(err));
    } else {
        res.status(400).send('The \'User\' is required. Please log into ' +
            'the Test Vortex Web App to create a new sesstion.');
    }

});

module.exports = router;