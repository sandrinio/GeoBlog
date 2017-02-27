var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var multer  = require('multer');
//var upload = multer({ dest: 'public/uploads/' });
var middleware = require("../middleware");
var flash = require("connect-flash");



router.get("/", function (req, res) {
   res.render("auth/landing");
});

router.get("/new", middleware.permissionChecker, function (req, res) {
   res.render("auth/new");
});

router.post("/new", function (req, res) {
   User.register(req.body.user, req.body.password, function (err, user) {
      if(err){
          console.log(err);
          req.flash("error", err);
          return res.render("auth/new");
      }
      passport.authenticate("local")(req, res, function () {
          req.flash("success", "User Created");
           res.redirect("back");
       })
   });
});

router.post("/", passport.authenticate("local", {
    successRedirect: "/mainPage",
    failureRedirect: "/"
}), function (req, res) {
    req.flash("success", "Welcome " + user.firstname + " " + (user.lastname));
    res.redirect("mainPage/mainPage");
});

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged Out");
    res.redirect("/");
});


module.exports = router;