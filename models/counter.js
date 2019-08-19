const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counterSchema = new Schema({
    counter_type: String,
    sequence_value: Number
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;