const questionRouter = require('express').Router();

const mongoose = require('mongoose');
const dbInterface = require('../../../../src/database-interface/mongodb/mongodb-interface');

const getQuestionRouter = (model, objectConverter, documentBuilder) => {
    addRoutes(questionRouter, 'pending', model, objectConverter, documentBuilder);
    addRoutes(questionRouter, 'approved', model, objectConverter, documentBuilder);
    addIDRoutes(questionRouter, model);

    return questionRouter;
};

const addRoutes = (router, status, model, objectConverter, documentBuilder) => {
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
        });
};

const addIDRoutes = (router, model) => {
    router.route('/id/:questionID')
        .get((req, res) => {
            getQuestion(model, req.params.questionID, res);
        })
        .delete((req, res) => {
            deleteQuestion(model, req.params.questionID, res);
        });
};

const getQuestions = (model, status, res) => {
    dbInterface.queryAllWithParameters(model, { status })
        .then(queryResults => res.status(200).send(queryResults))
        .catch(error => handleError(error, res));
};

const getQuestion = (model, id, res) => {
    dbInterface.queryOneByID(model, id)
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
    } else if (error instanceof mongoose.Error.CastError) {
        res.status(400).send('The input question \'ID\' is not valid!');
    } else {
        res.status(500).send('There was an internal server error!');
    }
};

module.exports = getQuestionRouter;