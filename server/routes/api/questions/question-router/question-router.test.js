const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const questionRouter = require('./question-router');

const dbInterface = require('../../../../src/database-interface/mongodb/mongodb-interface');
jest.mock('../../../../src/database-interface/mongodb/mongodb-interface', () => {
    return {
        queryAllWithParameters: jest.fn(),
        queryOneByID: jest.fn(),
        saveDocument: jest.fn(),
        updateDocument: jest.fn(),
        deleteDocument: jest.fn()
    };
});

const model = { name: 'question' };

const objectConverter = {
    convertToDBSchema: jest.fn()
};

const documentBuilder = jest.fn();

const exampleObject = {
    questionType: 'Multiple Choice',
    questionDescription: 'What is the best movie?',
    correctAnswer: 'Inception',
    answerA: 'Dark Knight',
    answerB: 'Tenet',
    answerC: 'Dunkirk'
};

const exampleObjectDBSchema = {
    question_type: 'Multiple Choice',
    question_description: 'What is the best movie?',
    correct_answer: 'Inception',
    answer_a: 'Dark Knight',
    answer_b: 'Tenet',
    answer_c: 'Dunkirk'
};

describe('question-router', () => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/', questionRouter(model, objectConverter, documentBuilder));

    describe('Pending Questions', () => {
        describe('GET Request', () => {
            it('handles requests with valid query results from database', (done) => {
                dbInterface.queryAllWithParameters.mockResolvedValueOnce(exampleObject);
    
                request(app)
                    .get('/pending')
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(dbInterface.queryAllWithParameters).toHaveBeenCalledWith(model, { status: 'pending'});
                        expect(res.body).toEqual(exampleObject);
                        return done();
                    });
            });

            it('handles requests with query errors', (done) => {
                dbInterface.queryAllWithParameters.mockRejectedValueOnce({});
    
                request(app)
                    .get('/pending')
                    .expect(500)
                    .end((err, res) => {
                        expect(res.text).toEqual('There was an internal server error!');
                        done();
                    });
            });

            afterEach(() => {
                dbInterface.queryAllWithParameters.mockClear();
            });
        });

        describe('POST request', () => {
            it('handles valid requests with successful database insert', (done) => {
                dbInterface.saveDocument.mockResolvedValueOnce();

                request(app)
                    .post('/pending')
                    .send(exampleObject)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(documentBuilder).toHaveBeenCalledWith('pending', exampleObject);
                        expect(res.text).toEqual('Thank you for your question submission!');
                        return done();
                    });
            });

            it('handles invalid requests', (done) => {
                dbInterface.saveDocument.mockRejectedValueOnce(new mongoose.Error.ValidationError());

                request(app)
                    .post('/pending')
                    .send(exampleObject)
                    .expect(400)
                    .end((err, res) => {
                        expect(documentBuilder).toHaveBeenCalledWith('pending', exampleObject);
                        expect(res.body.name).toEqual('ValidationError');
                        
                        if (err) return done(err);
                        return done();
                    });
            });

            it('handles server errors', (done) => {
                dbInterface.saveDocument.mockRejectedValueOnce(new Error());

                request(app)
                    .post('/pending')
                    .send(exampleObject)
                    .expect(500)
                    .end((err, res) => {
                        expect(documentBuilder).toHaveBeenCalledWith('pending', exampleObject);
                        expect(res.text).toEqual('There was an internal server error!');
                        
                        if (err) return done(err);
                        return done();
                    });
            });

            it('handles invalid requests', (done) => {
                dbInterface.saveDocument.mockRejectedValueOnce(new mongoose.Error.ValidationError());

                request(app)
                    .post('/pending')
                    .send(exampleObject)
                    .expect(400)
                    .end((err, res) => {
                        expect(documentBuilder).toHaveBeenCalledWith('pending', exampleObject);
                        expect(res.body.name).toEqual('ValidationError');
                        
                        if (err) return done(err);
                        return done();
                    });
            });

            afterEach(() => {
                dbInterface.saveDocument.mockClear();
                documentBuilder.mockClear();
            });
        });

        describe('PUT request', () => {
            it('handles valid requests with successful database update', (done) => {
                const existingIDObject = { ...exampleObject, _id: 12345678 };

                objectConverter.convertToDBSchema.mockReturnValue(exampleObjectDBSchema);
                dbInterface.updateDocument.mockResolvedValueOnce({});

                request(app)
                    .put('/pending')
                    .send(existingIDObject)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(objectConverter.convertToDBSchema).toHaveBeenCalledWith(existingIDObject);
                        expect(dbInterface.updateDocument)
                            .toHaveBeenCalledWith(model, existingIDObject._id, exampleObjectDBSchema);
                        expect(res.text).toEqual('The question was successfully updated!');
                        return done();
                    });
            });

            it('handles request with id not in database', (done) => {
                const existingIDObject = { ...exampleObject, _id: 12345678 };

                objectConverter.convertToDBSchema.mockReturnValue(exampleObjectDBSchema);
                dbInterface.updateDocument.mockResolvedValueOnce();

                request(app)
                    .put('/pending')
                    .send(existingIDObject)
                    .expect(404)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.text).toEqual('The question with that ID was not found!');
                        return done();
                    });
            });

            it('handles invalid requests', (done) => {
                dbInterface.updateDocument.mockRejectedValueOnce(new mongoose.Error.ValidationError());

                request(app)
                    .put('/pending')
                    .send(exampleObject)
                    .expect(400)
                    .end((err, res) => {
                        expect(res.body.name).toEqual('ValidationError');                        
                        if (err) return done(err);
                        return done();
                    });
            });

            afterEach(() => {
                dbInterface.updateDocument.mockClear();
            });
        });

        afterEach(() => {
            dbInterface.deleteDocument.mockClear();
            objectConverter.convertToDBSchema.mockClear();
        });
    });

    describe('Approved Questions', () => {
        describe('GET Request', () => {
            it('handles requests with valid query results from database', (done) => {
                dbInterface.queryAllWithParameters.mockResolvedValueOnce(exampleObject);
    
                request(app)
                    .get('/approved')
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(dbInterface.queryAllWithParameters).toHaveBeenCalledWith(model, { status: 'approved' });
                        expect(res.body).toEqual(exampleObject);
                        return done();
                    });
            });

            it('handles requests with query errors', (done) => {
                dbInterface.queryAllWithParameters.mockRejectedValueOnce({});
    
                request(app)
                    .get('/approved')
                    .expect(500)
                    .end((err, res) => {
                        expect(res.text).toEqual('There was an internal server error!');
                        done();
                    });
            });

            afterEach(() => {
                dbInterface.queryAllWithParameters.mockClear();
            });
        });

        describe('POST request', () => {
            it('handles valid requests with successful database update', (done) => {
                request(app)
                    .post('/approved')
                    .send(exampleObject)
                    .expect(404)
                    .end((err) => {
                        if (err) return done(err);
                        return done();
                    });
            });

            afterEach(() => {
                documentBuilder.mockClear();
                dbInterface.updateDocument.mockClear();
            });
        });

        describe('PUT request', () => {
            it('handles valid requests with successful database update', (done) => {
                const existingIDObject = { ...exampleObject, _id: 12345678 };

                objectConverter.convertToDBSchema.mockReturnValue(exampleObjectDBSchema);
                dbInterface.updateDocument.mockResolvedValueOnce({});

                request(app)
                    .put('/approved')
                    .send(existingIDObject)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(objectConverter.convertToDBSchema).toHaveBeenCalledWith(existingIDObject);
                        expect(dbInterface.updateDocument)
                            .toHaveBeenCalledWith(model, existingIDObject._id, exampleObjectDBSchema);
                        expect(res.text).toEqual('The question was successfully updated!');
                        return done();
                    });
            });

            it('handles valid requests and updates status', (done) => {
                const existingIDObject = { ...exampleObject, _id: 12345678 };

                objectConverter.convertToDBSchema.mockReturnValue({ ...exampleObjectDBSchema, status: 'pending' });
                dbInterface.updateDocument.mockResolvedValueOnce({});

                request(app)
                    .put('/approved')
                    .send(existingIDObject)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(objectConverter.convertToDBSchema).toHaveBeenCalledWith(existingIDObject);
                        expect(dbInterface.updateDocument)
                            .toHaveBeenCalledWith(model, existingIDObject._id, { ...exampleObjectDBSchema, status: 'approved' });
                        expect(res.text).toEqual('The question was successfully updated!');
                        return done();
                    });
            });

            it('handles request with id not in database', (done) => {
                const existingIDObject = { ...exampleObject, _id: 12345678 };

                objectConverter.convertToDBSchema.mockReturnValue(exampleObjectDBSchema);
                dbInterface.updateDocument.mockResolvedValueOnce();

                request(app)
                    .put('/approved')
                    .send(existingIDObject)
                    .expect(404)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.text).toEqual('The question with that ID was not found!');
                        return done();
                    });
            });

            it('handles invalid requests', (done) => {
                dbInterface.updateDocument.mockRejectedValueOnce(new mongoose.Error.ValidationError());

                request(app)
                    .put('/approved')
                    .send(exampleObject)
                    .expect(400)
                    .end((err, res) => {
                        expect(res.body.name).toEqual('ValidationError');                        
                        if (err) return done(err);
                        return done();
                    });
            });

            afterEach(() => {
                dbInterface.updateDocument.mockClear();
            });
        });

        afterEach(() => {
            dbInterface.deleteDocument.mockClear();
            objectConverter.convertToDBSchema.mockClear();
        });
    });

    describe('GET request for single question', () => {
        it('handles requests with valid query results from database', (done) => {
            dbInterface.queryOneByID.mockResolvedValueOnce(exampleObject);

            request(app)
                .get('/id/12345678')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(dbInterface.queryOneByID).toHaveBeenCalledWith(model, '12345678');
                    expect(res.body).toEqual(exampleObject);
                    return done();
                });
        });
    });

    describe('DELETE request for single question', () => {
        it('handles requests with valid query results from database', (done) => {
            dbInterface.deleteDocument.mockResolvedValueOnce(exampleObject);

            request(app)
                .delete('/id/12345678')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(dbInterface.deleteDocument).toHaveBeenCalledWith(model, '12345678');
                    expect(res.text).toEqual('The question was successfully deleted!');
                    return done();
                });
        });

        it('handles requests with invalid IDs', (done) => {
            dbInterface.deleteDocument.mockRejectedValueOnce(new mongoose.Error.CastError);

            request(app)
                .delete('/id/12345678')
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.text).toEqual('The input question \'ID\' is not valid!');
                    return done();
                });
        });
    });
});