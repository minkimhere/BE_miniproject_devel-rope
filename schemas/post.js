const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  nickname: {
    type: String,
    required: true,
  },
  userIcon: {
    type: String,
  },
  content: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  date: {
    type: String,
  },
  comment_cnt: {
    type: Number,
  },
});

postSchema.plugin(AutoIncrement, { inc_field: "postId" });

module.exports = mongoose.model("Post", postSchema);
