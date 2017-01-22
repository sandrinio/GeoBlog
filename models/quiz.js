/**
 * Created by Sandro on 1/22/17.
 */
var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({

     image1: String,
     image2: String,
     question: String,
     answer1: String,
     answer2: String,
     answer3: String,
     answer4: String,
     answer5: String,
     answer6: String

});


module.exports = mongoose.model("Quiz", quizSchema);