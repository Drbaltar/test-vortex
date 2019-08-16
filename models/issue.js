const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    question_id: Number,
    issue_type: String,
    issue_description: String
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;