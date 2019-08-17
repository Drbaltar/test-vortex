const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    question_id: {
        type: Number,
        required: 'The \'Question ID\' field is required'
    },
    issue_type: {
        type: String,
        required: 'The \'Issue Type\' field is required'
    },
    issue_description: {
        type: String,
        required: 'The \'Issue Description\' field is required',
        minlength: 3
    }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;