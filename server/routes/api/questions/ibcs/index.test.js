const express = require('express');
const request = require('supertest');
const ibcsRouter = require('./index');
const dbInterface = require('../../../../src/database-interface/mongodb/mongodb-interface');

describe('ibcsRouter', () => {
    const app = express();
    app.use('/', ibcsRouter);

    // describe('GET request for question topics', () => {
    //     it('handles requests and returns results', (done) => {
    //         request(app)
    //             .get('/topics')
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 return done();
    //             });
    //     });
    // });
});
