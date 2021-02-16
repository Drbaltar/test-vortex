/*
*  This module serves as the function for deleting an 'Issue' by ID
*  Author: Kyle McCain
*  Date: 19 August 2020
*/

// Declare 'Issue' model
const Issue = require('../../../../models/issue');

// Export function that deletes an 'Issue' from the database
module.exports = async (req, res) => {
    try {
        // Search database for 'Issue' by input ID and delete
        let results = await Issue.findByIdAndDelete(req.params.id).lean().exec();

        if (results) {
            // Send message that action has been completed
            res.send('The issue has been successfully deleted!');
        } else {
            // Send message that the 'Issue' based on input ID was not found
            res.status(404).send('The issue with the input ID could not be found!');
        }
    
    // Handle errors
    } catch (error) {
        // Input ID is not a valid ObjectID
        if (error.name === 'CastError') {
            console.log('\'Issue\' ID is not a valid ObjectID: ' + error);
            res.status(400).send(error);
        
        // Handle all other errors
        } else {
            console.log('\'Issue\' Deletion by ID failed: ' + error);
            res.status(500).send(error);
        }
    }
};