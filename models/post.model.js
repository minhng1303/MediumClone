const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    sub_title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'Author' },
    tag: { type: mongoose.Types.ObjectId, required: true, ref: 'Tag' }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
