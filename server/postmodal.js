const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: String,
  imageUrl: {
    type: String,
    required: true,
  },
  caption: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [
    {
      username: String,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", PostSchema);
