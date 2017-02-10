/**
 * Created by Sandro on 1/22/17.
 */
var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({

     image: String,
     question: String,
     answers: {},
     correctAnswer: String
});


module.exports = mongoose.model("Quiz", quizSchema);