var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/profile", function(req, res){
   res.render("auth/profile"); 
});

router.put("/profile", function (req, res) {
    User.findByIdAndUpdate(req.user.id, req.body.user, function (err, user) {
        if(err){
            console.log(err);
        }else{
            res.redirect("/profile");
        }
    })
});



module.exports = router;