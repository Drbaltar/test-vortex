/*
*  This module tests the function used for saving new 'Issues' to the database 
*  Author: Kyle McCain
*  Date: 12 August 2020
*/

// Declare 'Issue' model and create mock
const Issue = require('../../../../models/issue');
jest.mock('../../../../models/issue');

// Import component being tested
const SubmitIssue = require('./index');

// Create a valid body for a request
const validBody = {
    issue_type: 'Question Type',
    issue_category: 'Test Category',
    issue_description: 'Test Question Issue',
    question_id: '5ea9b33b96cedb1544957fb3'
};

// Create a valid user for a request
const validUser = {
    username: 'kmccain'
};

// Create a mock response
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

// Run all tests
describe('Submit \'Issue\' API test', () => {

    test('\'Issue\' document creation should handle request missing user', () => {
        let req = {body: validBody};
        let res = mockResponse();

        SubmitIssue(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalled();
    });

    test('\'Issue\' document creation should handle request missing body', () => {
        let req = {user: validUser};
        let res = mockResponse();

        SubmitIssue(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalled();
    });

    test('\'Issue\' document validation should handle error', async () => {
        expect.assertions(2);
        let req = {body: validBody, user: validUser};
        let res = mockResponse();
        let error = {name: 'ValidationError'};

        Issue.mockImplementationOnce(() => {
            return {
                validate: jest.fn().mockRejectedValue(error)
            };
        });

        await SubmitIssue(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(error);
    });

    test('\'Issue\' database save error should be handled', async () => {
        expect.assertions(2);
        let req = {body: validBody, user: validUser};
        let res = mockResponse();
        let error = new Error('Database couldn\'t save new Issue!');

        Issue.mockImplementationOnce(() => {
            return {
                validate: jest.fn().mockResolvedValue(),
                save: jest.fn().mockRejectedValue(error)
            };
        });

        await SubmitIssue(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(error);
    });

    test('\'Issue\' should be saved successfully', async () => {
        expect.assertions(1);
        let req = {body: validBody, user: validUser};
        let res = mockResponse();

        Issue.mockImplementationOnce(() => {
            return {
                validate: jest.fn().mockResolvedValue(),
                save: jest.fn().mockResolvedValue(validBody)
            };
        });

        await SubmitIssue(req, res);
        expect(res.send).toHaveBeenCalledWith('Thank you for your issue submission!');
    });
});