/*
*  This module serves as the function for saving new 'Issues' to the database
*  Author: Kyle McCain
*  Date: 17 August 2020
*/

// Declare 'Issue' model
const Issue = require('../../../../models/issue');

// Export function that submits new 'Issue' to the database
module.exports = async (req, res) => {
    // Declare new 'Issue' variable
    let newIssue;

    // Try to create a new 'Issue' document with the input data from request
    try {
        newIssue =  new Issue({
            issue_type: req.body.issue_type,
            issue_category: req.body.issue_category,
            issue_description: req.body.issue_description,
            question_id: req.body.question_id,
            submitted_by: req.user.username
        });
    // Handle error from creating 'Issue' document
    } catch (error) {
        console.log(`'Issue' Document Creation Failed: ${error}`);
        res.status(400).send(error);
        return;
    }

    try {
        // Validate document requirements
        await newIssue.validate();
        
        // Save new 'Issue'
        let result = await newIssue.save();
        
        // Send success message
        console.log(`New 'Issue' Submitted: ${result}`);
        res.send('Thank you for your issue submission!');
    
    // Handle errors
    } catch (error) {
        // Validation error
        if (error.name === 'ValidationError') {
            console.log(`'Issue' Validation Failed: ${error}`);
            res.status(400).send(error);
        
            // All other database errors
        } else {
            console.log(`Error: ${error}`);
            res.status(500).send(error);
        }
    }
};