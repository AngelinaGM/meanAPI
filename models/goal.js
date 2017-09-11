const mongoose = require('mongoose');
const config = require('../config/database');

// Goal Schema
const GoalSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    expiredDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);
