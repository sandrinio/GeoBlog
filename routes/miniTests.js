var express = require("express");
var router = express.Router();
// var Quizz = require("./models/quizz");


router.get("/quizz", function(req, res){
   res.render("quizz/quizz")
});



module.exports = router;