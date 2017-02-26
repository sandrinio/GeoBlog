var express = require("express");
var router = express.Router();
var Posts = require("../models/post");
var middleware = require("../middleware");
var path = require('path');
var multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads/postContentPhotos/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage : storage}).single('contentPhoto');

router.get("/mainPage", middleware.isLoggedIn, function(req, res){
  if(!req.query.tagName || req.query.tagName === 'none'){
    Posts.find({}).sort('-date').exec(function (err, bpost) {
      if (err) {
        res.redirect('back');
        req.flash('Error', err)
      } else {
        var totalBlogPostsCount = bpost.length,
          pageSize = 10,
          pageCount = totalBlogPostsCount / pageSize + 1,
          currentPage = 1,
          blogPostsArray = [],
          blogPostsList = [];

        while (bpost.length > 0) {
          blogPostsArray.push(bpost.splice(0, pageSize));
        }
        if (typeof req.query.page !== 'undefined') {
          currentPage = +req.query.page;
        }
        blogPostsList = blogPostsArray[ + currentPage - 1];
        res.render("mainPage/mainPage", {
          bpost: blogPostsList,
          pageSize: pageSize,
          totalBlogPostsCount: totalBlogPostsCount,
          pageCount: pageCount,
          currentPage: currentPage
        });
      }
    });
    }else{
    Posts.find({tag: req.query.tagName}, function (err, bpost) {
    if(err){
      res.redirect('back');
      req.flash('Error', err)
    }else{
      var totalBlogPostsCount = bpost.length,
        pageSize = 10,
        pageCount = totalBlogPostsCount / pageSize + 1,
        currentPage = 1,
        blogPostsArray = [],
        blogPostsList = [];

      while (bpost.length > 0) {
        blogPostsArray.push(bpost.splice(0, pageSize));
      }
      if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
      }
      blogPostsList = blogPostsArray[ + currentPage - 1];
      res.render("mainPage/mainPage", {
        bpost: blogPostsList,
        pageSize: pageSize,
        totalBlogPostsCount: totalBlogPostsCount,
        pageCount: pageCount,
        currentPage: currentPage
      });
    }
    });
  }

});


router.get("/mainPage/storeRegForms", middleware.isLoggedIn,function (req, res) {
  res.render('mainPage/storeRegForms')
});

router.get("/mainPage/appStore", middleware.isLoggedIn, function (req, res) {
    res.render("mainPage/appStore")
});


router.get("/mainPage/new",  middleware.isLoggedIn, function (req, res) {
    res.render("mainPage/new")
});



router.get("/mainPage/:id", middleware.isLoggedIn, function (req, res) {
    Posts.findById(req.params.id).populate("comments").exec(function (err, thisPost) {
        if(err){
            req.flash("error", err);
            console.log("something went wrong")
        }else {
            res.render("mainPage/show", {thisPost: thisPost});
        }
    });
});



router.post('/mainPage/imgLinkGenerator', function (req, res) {
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
     res.end("File URL: " + req.file.path);
    console.log(req.file)
  });
});



router.post("/mainPage", middleware.isLoggedIn, function (req, res) {
    var postContent = req.body.iPost;
    postContent.author = {
                    firstname: req.user.firstname,
                    lastname: req.user.lastname,
                    pic: "placeholderImg.png",
                    id: req.user._id
                         };
    console.log(postContent);
    Posts.create(postContent, function (err, createdPost) {
       if(err){
           return console.log(err);
       }
        req.flash("success", "Good Job :)")
       res.redirect("/mainPage");
   });
});






//  ================== ADMIN PERMISSIONS ==================
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
            req.flash("success", "Post Was modified");
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