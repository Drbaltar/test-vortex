const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    questionEntry: Number,
    issueType: String,
    issueDescription: String
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;