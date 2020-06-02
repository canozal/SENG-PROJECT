const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    topic: String,
    comment: String
},{
    timestamps: true,
    toObject: {
        transform: function(doc, ret, options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Comment', commentSchema);