var express = require("express");
var router = express.Router();
var Posts = require("../models/post");

router.get("/mainPage", function(req, res){
   res.render("mainPage/mainPage");
});

router.get("/mainPage/new", function (req, res) {
   res.render("mainPage/new")
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

router.get("/mainPage/offices", function (req, res) {
   res.render("mainPage/offices");
});

router.get("/test", function (req, res) {

    Posts.find({}, function (err, guide) {
        res.render("mainPage/test", {guide: guide});
    });

});



module.exports = router;