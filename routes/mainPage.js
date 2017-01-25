var express = require("express");
var router = express.Router();
var Posts = require("../models/post");
var middleware = require("../middleware")

router.get("/mainPage", middleware.isLoggedIn, function(req, res){
   Posts.find({}, function (err, post) {
       if(err){
           console.log(err);
       }else{
           res.render("mainPage/mainPage", {post: post});
       }
   });

});

router.get("/mainPage/new", function (req, res) {
    res.render("mainPage/new")
});



router.get("/mainPage/:id", function (req, res) {
    Posts.findById(req.params.id, function (err, thisPost) {
        res.render("mainPage/show", {thisPost: thisPost});
    });
});



router.post("/mainPage", function (req, res) {
    var postContent = req.body.iPost;
    postContent.author = {
                    firstname: req.user.firstname,
                    lastname: req.user.lastname,
                    pic: req.user.pic,
                    id: req.user._id
                         };
    console.log(postContent);
    Posts.create(postContent, function (err, createdPost) {
       if(err){
           return console.log(err);
       }

       res.redirect("/mainPage");
   });
});


router.get("/show", function (req, res) {
        res.send("coming soon")
});



module.exports = router;