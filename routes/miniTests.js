var express = require("express");
var router = express.Router();
var Quiz = require("../models/quiz");
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/quizPictures/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
});

var upload = multer({ storage: storage });

router.get("/quiz", function(req, res){
   res.render("quiz/quiz");
});

router.get("/quiz/new", function (req, res) {
   res.render("quiz/new");
});

router.post("/quiz/new", upload.single('test[image1]'), function (req, res) {
    Quiz.create(req.body.test, function (err, quiz) {
       if(err){
          console.log(err);
       }else{
           console.log(quiz);
           res.render("quiz/new");
       }
   });
    res.render("quiz/new");
});


module.exports = router;
