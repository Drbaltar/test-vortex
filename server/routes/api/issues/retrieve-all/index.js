/*
*  This module serves as the function for retrieving all 'Issues'
*  Author: Kyle McCain
*  Date: 19 August 2020
*/

// Declare 'Issue' model
const Issue = require('../../../../models/issue');

// Export function that searches for all 'Issues'in the database
module.exports = async (req, res) => {
    try {
        // Search database for all 'Issues'
        let results = await Issue.find().lean().exec();

        // Send results
        res.send(results);
    
    // Handle errors
    } catch (error) {
        console.log('All \'Issue\' Retrieval Error: ' + error);
        res.status(500).send(error);
    }
};