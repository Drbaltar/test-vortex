const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for a multiple choice question
const multQuestionSchema = new Schema({
    question_type: {
        type: String,
        required: true,
        default: 'Multiple Choice'
    },
    question_description: {
        type: String,
        required: true,
        minlength: 10
    },
    answer_a: {
        type: String,
        required: true
    },
    answer_b: {
        type: String,
        required: true
    },
    answer_c: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    gunnery_table: {
        table: {
            type: String,
            required: true
        },
        subtask: {
            type: Number,
            required: true
        }
    },
    test_type: {
        type: String,
        enum: ['Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command', 'Launcher', 'Tactics/Communications'],
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    reference: String
});

const MultQuestion = mongoose.model('approved_question', multQuestionSchema);
const PendingMultQuestion = mongoose.model('pending_question', multQuestionSchema);

module.exports = {
    MultQuestion,
    PendingMultQuestion
};