const questionTopics = require('./question-topics');
const dbInterface = require('../../../../src/database-interface/mongodb/mongodb-interface');
jest.mock('../../../../src/database-interface/mongodb/mongodb-interface', () => {
    return {
        queryAllWithSelectFields: jest.fn(),
    };
});

const testModel = {
    test: 'test'
};

describe('question-topics', () => {
    beforeAll(() => {
        questionTopics(testModel);
    });

    it('calls the dbInterface with the passed in Model', () => {
        expect(dbInterface.queryAllWithSelectFields).toHaveBeenCalledWith(testModel, '-_id topics');
    });
});