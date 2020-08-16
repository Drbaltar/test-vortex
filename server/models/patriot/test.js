const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    created_by: {
        type: String,
        required: 'The \'Created By\' field is required'
    },
    test_name: {
        type: String,
        required: 'The \'Test Name\' field is required'
    },
    versions: {
        type: [{
            version: {
                type: String,
                required: 'The \'Version\' field is required'
            },
            date_created: {
                type: String,
                required: 'The \'Date Created\' field is required'
            },
            revision_date: {
                type: String
            },
            questions: {
                type: [{
                    question: {
                        type: Schema.Types.ObjectId,
                        required: 'The \'Question ID\' field is required for each question',
                        refPath: 'versions.questions.question_type'
                    },
                    question_type: {
                        type: String,
                        required: 'The \'Question Type\' field is required for each question',
                        enum: ['MultQuestion', 'TFQuestion', 'FillBlankQuestion']
                    },
                    original_question_version: {
                        type: Number,
                        required: 'The \'Question Version\' field is required for each question'
                    },
                    answer_order: {
                        type: [String],
                        enum: ['correct_answer', 'answer_a', 'answer_b', 'answer_c']
                    }
                }],
                required: 'The \'Questions\' for the test are required',
                validate: {
                    validator: function(v) {
                        return v.length > 24;
                    },
                    message: 'There must be at least 25 \'Questions\' to save the test'
                }
            }
        }],
        required: 'There must be at least one \'Version\' of the test input',
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'There must be at least one \'Version\' of the test input'
        }
    }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;