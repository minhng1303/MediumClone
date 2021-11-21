const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: { type: String, required: true},
    avatar: { type: String, required: true },
    short_intro: { type: String, required: true },
    posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post'}]
});

module.exports = mongoose.model("Author", authorSchema);