/*
*  This module serves as the function for retrieving individual 'Issues' by ID
*  Author: Kyle McCain
*  Date: 17 August 2020
*/

// Declare 'Issue' model
const Issue = require('../../../../models/issue');

// Export function that searches for an 'Issue' by ID
module.exports = async (req, res) => {
    try {
        // Search database for 'Issue' by input ID
        let results = await Issue.findById(req.params.id).lean().exec();

        // Send results
        res.send(results);
    
    // Handle errors
    } catch (error) {
        // Input ID is not a valid ObjectID
        if (error.name === 'CastError') {
            console.log('\'Issue\' ID is not a valid ObjectID: ' + error);
            res.status(400).send(error);
        
        // Handle all other errors
        } else {
            console.log('\'Issue\' Retrieval by ID failed: ' + error);
            res.status(500).send(error);
        }
    }
};