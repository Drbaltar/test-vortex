const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fillBlankQuestionSchema = new Schema({
    question_number: Number,
    question_type: {
        type: String,
        required: 'The \'Question Type\' field is required',
        default: 'Fill-in-the-Blank'
    },
    question_description: {
        type: String,
        required: 'The \'Question Description\' field is required',
        minlength: 10
    },
    correct_answer: {
        type: [String],
        required: 'The \'Correct Answer(s)\' field is required'
    },
    gunnery_table: {
        table: {
            type: String,
            required: 'The \'Gunnery Table\' field is required'
        },
        subtask: {
            type: Number,
            required: 'The \'Gunnery Table Subtask\' field is required'
        }
    },
    test_type: {
        type: String,
        enum: ['Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command', 'Launcher', 'Tactics/Communications'],
        required: 'The \'Test Type\' field is required'
    },
    topic: {
        type: String,
        required: 'The \'Topic\' field is required'
    },
    reference: String
});

const FillBlankQuestion = mongoose.model('FillBlankQuestion', fillBlankQuestionSchema, 'approved_questions');
const PendingFillBlankQuestion = mongoose.model('FillBlankQuestion', fillBlankQuestionSchema, 'pending_questions');

module.exports = {
    FillBlankQuestion,
    PendingFillBlankQuestion
};