var mongoose = require("mongoose");

var postsSchema = new mongoose.Schema({
    title: String,
    tag: String,
    content: String,

    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
                },
            firstname: String,
            lastname: String,
            pic: String
            },
    date: {type: Date, default: Date.now},
    status: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


module.exports = mongoose.model("Post", postsSchema);
