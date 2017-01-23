var express = require("express");
var router = express.Router();
var Posts = require("../models/post");

router.get("/mainPage", function(req, res){
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
    Posts.findById(req.params.id, function (err, guide) {
        res.render("mainPage/show", {guide: guide});
    });
});



router.post("/mainPage", function (req, res) {
    console.log(req.body.iPost);
    Posts.create(req.body.iPost, function (err, createdPost) {
       if(err){
           return console.log(err);
       }
       res.redirect("/mainPage")
   });
});


router.get("/show", function (req, res) {
        res.send("coming soon")
});



module.exports = router;