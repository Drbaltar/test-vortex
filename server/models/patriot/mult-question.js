const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const multQuestionSchema = new Schema({
    question_number: Number,
    question_type: {
        type: String,
        required: 'The \'Question Type\' field is required',
        default: 'Multiple Choice'
    },
    question_description: {
        type: String,
        required: 'The \'Question Description\' field is required',
        minlength: 10
    },
    answer_a: {
        type: String,
        required: 'The \'Answer A\' field is required'
    },
    answer_b: {
        type: String,
        required: 'The \'Answer B\' field is required'
    },
    answer_c: {
        type: String,
        required: 'The \'Answer C\' field is required'
    },
    correct_answer: {
        type: String,
        required: 'The \'Correct Answer\' field is required'
    },
    gunnery_table: {
        type: [{
            unit_type: {
                type: String,
                enum: ['Battery', 'Battalion'],
                required: 'The \'Gunnery Unit Type\' field is required'
            },
            test_type: {
                type: String,
                enum: ['Tactics', 'Communications', 'RSOP', 'Early Warning/Mission Command', 'Launcher'],
                required: 'The \'Gunnery Test Type\' field is required'
            },
            table: {
                type: String,
                required: 'The \'Gunnery Table\' field is required'
            },
            subtask: {
                type: Number,
                required: 'The \'Gunnery Table Subtask\' field is required'
            }
        }],
        required: 'The \'Gunnery Table\' information is required',
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'The \'Gunnery Table\' information is missing'
        }
    },
    topic: {
        major_category: {
            type: String,
            required: 'The \'Major Category of Topic\' field is required'
        },
        sub_category: {
            type: String,
            required: 'The \'Sub-Category of Topic\' field is required'
        }
    }
});

const MultQuestion = mongoose.model('MultQuestion', multQuestionSchema, 'approved_questions');
const PendingMultQuestion = mongoose.model('MultQuestion', multQuestionSchema, 'pending_questions');

module.exports = {
    MultQuestion,
    PendingMultQuestion
};