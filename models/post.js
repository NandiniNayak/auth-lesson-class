const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Post schema
const Post = new Schema({
    title: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true
    },
    modified_date: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: String
});
// mongoose.model('model', schema);
module.exports = mongoose.model('Post', Post);