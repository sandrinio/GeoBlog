var mongoose = require("mongoose");
var User = require("./user");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
        firstname: String,
        pic: String
    }
});






module.exports = mongoose.model("Comment", commentSchema);