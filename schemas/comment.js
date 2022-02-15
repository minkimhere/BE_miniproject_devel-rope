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
  date : {
    type: String,
  },
});

// CommentSchema.virtual("userId").get(function () {
//   return this._id.toHexString();
// });
// CommentSchema.set("toJSON", {
//   virtuals: true,
// });
CommentSchema.plugin(AutoIncrement, { inc_field: "commentId" });
// CommentSchema.plugin(AutoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("Comment", CommentSchema);
