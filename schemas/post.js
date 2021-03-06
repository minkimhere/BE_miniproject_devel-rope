const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose)

const postSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
    },
    userIcon: {
        type:String
    },
    content: {
        type: String,
        required : true,
    },
    imgUrl: {
        type: String,
        required : true
    },
    date: {
        type: String
    },
    comment_cnt: {
        type: Number
    }
});

postSchema.plugin(AutoIncrement, {inc_field: 'postId'});

module.exports = mongoose.model("Post", postSchema);