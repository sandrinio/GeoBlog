var express = require("express");
var router = express.Router();
var Quiz = require("../models/quiz");
var Posts = require('../models/post');
var multer = require('multer');
var path = require('path');
var middleware = require("../middleware");

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
  Posts.find({'tag': 'Android'}, function(err, post) {
    if(err){
      console.log(err);
    }else{
      res.render("quiz/quiz", {post: post});
    }
  });
});

router.get("/quiz/new", middleware.permissionChecker, function (req, res) {
   res.render("quiz/new");
});

router.post("/quiz/new", middleware.permissionChecker, upload.single('image'), function (req, res) {


    var content = {};

    content.question = req.body.question;
    content.answers = req.body.test;
    content.correctAnswer = req.body.correctAnswer;

    console.log(content);




   //  Quiz.create(content, function (err, quiz) {
  //     if(err){
  //        console.log(err);
  //     }else{
  //         console.log(quiz);
  //         res.render("quiz/new");
  //     }
  // });
 });


module.exports = router;
