const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: 'The \'Username\' field is required'
    },
    password: {
        type: String,
        required: 'The \'Password\' field is required'
    },
    first_name: {
        type: String,
        required: 'The \'First Name\' field is required'
    },
    last_name: {
        type: String,
        required: 'The \'Last Name\' field is required'
    },
    permission_level: {
        type: String,
        enum: ['Admin', 'User'],
        required: 'The \'Permission Level\' field is required'
    }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;