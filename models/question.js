const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question_type: String,
    question_description: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = question;