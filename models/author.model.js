const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: { type: String, required: true},
    avatar: { type: String, required: true },
    shortIntro: { type: String, required: true }
});

module.exports = mongoose.model("Author", authorSchema);