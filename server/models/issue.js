
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueTypes = ['Question Issue', 'Application Issue'];

const issueSchema = new Schema({
    issue_type: {
        type: String,
        enum: issueTypes,
        required: 'The \'Issue Type\' field is required'
    },
    issue_category: {
        type: String,
        required: 'The \'Issue Category\' field is required'
    },
    issue_description: {
        type: String,
        required: 'The \'Issue Description\' field is required',
        minlength: 3
    },
    question_id: {
        type: Schema.Types.ObjectId,
        required: [
            function() {
                return this.issue_type === 'Question Issue';
            },
            'The \'Question ID\' field is required for question issues'
        ]
    },
    submitted_by: {
        type: String,
        required: 'The \'Submitted By\' field is required'
    }
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;