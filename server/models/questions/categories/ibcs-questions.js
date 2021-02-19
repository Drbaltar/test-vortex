const ibcsQuestionCategories = {
    test_type: {
        type: [String],
        enum: ['Tactics', 'Early Warning', 'Weapons Control'],
        required: 'The \'IBCS Test Type\' field is required',
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
            required: 'The \'Topic (Major Category)\' field is required'
        },
        sub_category: {
            type: String,
            required: 'The \'Topic (Sub-Category)\' field is required'
        }
    }
};

module.exports = {
    ibcsQuestionCategories
};