const mongoose = require("mongoose");
const { stringify } = require("querystring");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CommentSchema = new mongoose.Schema({
  userId : {
    type : Number,
  },
  comment: {
    type: String,
  },
  postId: {
    type: String,
  },
  userIcon : {
    type : String,
  },
  nickname : {
    type : String,
  },
  date : {
    type : String,
  }
});

CommentSchema.plugin(AutoIncrement, { inc_field: "commentId" });

module.exports = mongoose.model("Comment", CommentSchema);
