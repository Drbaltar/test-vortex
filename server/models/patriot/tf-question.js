const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tfQuestionSchema = new Schema({
    question_number: Number,
    question_type: {
        type: String,
        required: 'The \'Question Type\' field is required',
        default: 'True or False'
    },
    question_description: {
        type: String,
        required: 'The \'Question Description\' field is required',
        minlength: 10
    },
    correct_answer: {
        type: String,
        enum: ['True', 'False'],
        required: 'The \'Correct Answer\' field is required'
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

const TFQuestion = mongoose.model('TFQuestion', tfQuestionSchema, 'approved_questions');
const PendingTFQuestion = mongoose.model('TFQuestion', tfQuestionSchema, 'pending_questions');

module.exports = {
    TFQuestion,
    PendingTFQuestion
};