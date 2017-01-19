var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function (req, res) {
   res.render("auth/landing");
});

router.get("/new", function (req, res) {
   res.render("auth/new");
});

router.post("/new", function (req, res) {
   User.register(req.body.user, req.body.password, function (err, user) {
      if(err){
          console.log(err);
          return res.render("auth/new");
      }
      passport.authenticate("local")(req, res, function () {
           res.redirect("/mainPage");
       })
   });
});

router.post("/", passport.authenticate("local", {
    successRedirect: "/mainPage",
    failureRedirect: "/"
}), function (req, res) {
    res.redirect("mainPage/mainPage");
});

router.get("/logout", function (req, res) {
    req.logout();
    //req.flash("success", "Logged Out");
    res.redirect("/");
});




module.exports = router;