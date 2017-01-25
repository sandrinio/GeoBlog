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

router.get("/mainPage/storeRegForms", function (req, res) {
    res.render("mainPage/storeRegForms")
});

router.get("/mainPage/new",  middleware.isLoggedIn, function (req, res) {
    res.render("mainPage/new")
});



router.get("/mainPage/:id", middleware.isLoggedIn, function (req, res) {
    Posts.findById(req.params.id, function (err, thisPost) {
        res.render("mainPage/show", {thisPost: thisPost});
    });
});



router.post("/mainPage", middleware.isLoggedIn, function (req, res) {
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


router.get("/show", middleware.isLoggedIn, function (req, res) {
        res.send("coming soon")
});

//  ================== ADMIN PARTS ==================
router.get("/mainPage/:id/edit", middleware.permissionChecker, function (req, res) {
    Posts.findById(req.params.id, function (err, cPost) {
        if(err){
            req.flash(err);
            res.redirect("back");
        }else {
            res.render("mainPage/edit", {cPost: cPost})
        }
    });
});

router.put("/mainPage/:id", function (req, res) {
    Posts.findByIdAndUpdate(req.params.id, req.body.cPost, function (err, changedPost) {
        if(err){
            req.flash("error", err);
            res.redirect("back")
        }else{
            req.flash("success", "Post Was modified")
            res.redirect("back");
        }
    })
});



router.delete("/mainPage/:id", middleware.permissionChecker, function (req, res) {
   Posts.findByIdAndRemove(req.params.id, function (err, blogPost) {
      if(err){
      console.log(err)
      }else{
          req.flash("success", blogPost.title + " " + "has been removed")
          res.redirect("/mainPage");
      }
   });
});


module.exports = router;