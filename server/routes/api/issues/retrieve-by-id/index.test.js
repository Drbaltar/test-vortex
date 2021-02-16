/*
*  This module tests the function used for retrieving an 'Issue' from the database 
*  Author: Kyle McCain
*  Date: 19 August 2020
*/

// Declare 'Issue' model and create mock
const Issue = require('../../../../models/issue');
jest.mock('../../../../models/issue');

// Import module being tested
const RetrieveIssue = require('./index');

// Create a valid mock request
const mockRequest = (id) => {
    return {params: {id}};
};

// Create a mock response
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

// Run all tests
describe('Retrieve \'Issue\' by ID API test', () => {

    beforeEach(() => {
        Issue.mockClear();
    });

    test('Invalid ObjectID value should be handled', async () => {
        expect.assertions(2);
        let req = mockRequest();
        let res = mockResponse();
        let error = new Error();
        error.name = 'CastError';

        Issue.findById = jest.fn(() => {throw error;});

        await RetrieveIssue(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(error);
    });

    test('\'Issue\' database query error should be handled', async () => {
        expect.assertions(2);
        let req = mockRequest();
        let res = mockResponse();
        let error = new Error('Issue database query failed');

        Issue.findById = jest.fn(() => {throw error;});

        await RetrieveIssue(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(error);
    });

    test('\'Issue\' query finished and returned in response', async () => {
        expect.assertions(1);
        let req = mockRequest();
        let res = mockResponse();
        let queryResults = {issue: 'Test Issue'};
        let mockQuery = {
            findById: jest.fn().mockReturnThis(),
            lean: jest.fn().mockReturnThis(),
            exec: jest.fn().mockReturnValue(queryResults),
        };

        Issue.findById = mockQuery.findById;
        Issue.lean = mockQuery.lean;
        Issue.exec = mockQuery.exec;

        await RetrieveIssue(req, res);
        expect(res.send).toHaveBeenCalledWith(queryResults);
    });
});