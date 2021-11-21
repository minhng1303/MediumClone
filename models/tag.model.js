const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post'}]
});

module.exports = mongoose.model("Tag", tagSchema);
