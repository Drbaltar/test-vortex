const questionRouter = require('express').Router();

const mongoose = require('mongoose');
const dbInterface = require('../../../../src/database-interface/mongodb/mongodb-interface');

const getQuestionRouter = (model, objectConverter, documentBuilder) => {
    addRoute(questionRouter, 'pending', model, objectConverter, documentBuilder);
    addRoute(questionRouter, 'approved', model, objectConverter, documentBuilder);

    return questionRouter;
};

const addRoute = (router, status, model, objectConverter, documentBuilder) => {
    router.route(`/${status}`)
        .get((req, res) => {
            getQuestions(model, status, res);
        })
        .post((req, res) => {
            const newQuestion = documentBuilder(status, req.body);
            if (status === 'pending') {
                addQuestion(newQuestion, res);
            } else {
                res.status(404).send();
            }
        })
        .put((req, res) => {
            const dataInDBSchema = objectConverter.convertToDBSchema(req.body);
            status !== req.body.status ? dataInDBSchema.status = status : null;
            updateQuestion(model, req.body._id, dataInDBSchema, res);
        })
        .delete((req, res) => {
            deleteQuestion(model, req.query._id, res);
        });
};

const getQuestions = (model, status, res) => {
    dbInterface.queryAllWithParameters(model, { status })
        .then(queryResults => res.status(200).send(queryResults))
        .catch(error => handleError(error, res));
};

const addQuestion = (newQuestion, res) => {
    dbInterface.saveDocument(newQuestion)
        .then(() => res.status(200).send('Thank you for your question submission!'))
        .catch(error => handleError(error, res));
};

const updateQuestion = (model, id, data, res) => {
    dbInterface.updateDocument(model, id, data)
        .then((result) => handleDBChange('update', result, res))
        .catch(error => handleError(error, res));
};

const deleteQuestion = (model, id, res) => {
    dbInterface.deleteDocument(model, id)
        .then((result) => handleDBChange('delete', result, res))
        .catch(error => handleError(error, res));
};

const handleDBChange = (action, result, res) => {
    if (result) {
        res.status(200).send(`The question was successfully ${action}d!`);
    } else {
        res.status(404).send('The question with that ID was not found!');
    }
};

const handleError = (error, res) => {
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).send(error);
    } else {
        res.status(500).send('There was an internal server error!');
    }
};

module.exports = getQuestionRouter;