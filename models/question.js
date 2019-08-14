const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionType: String,
    questionDescription: String
});

const question = mongoose.model('question', questionSchema);

module.exports = question;