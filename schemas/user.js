const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    nickname: {
        type:String,
        require:true,
        unique:true
    },
    git: {
        type:String,
    },
    blog: {
        type:String,
    },
    userIcon: {
        type:String,
    },

    salt: {
        type:String,
    }
});

usersSchema.plugin(AutoIncrement, {inc_field: 'userId'});

module.exports = mongoose.model ('User', usersSchema);