var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var multer  = require('multer');


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

var upload = multer({ dest: 'public/uploads/' }).single("user[pic]");
router.put("/avatar", function (req, res) {

    upload(req, res, function (err) {
        if(err){
            return console.log(err);
        }
        var pic = ({pic: req.file.path});
        User.findByIdAndUpdate(req.user.id, pic, function (err, userPic) {
            if(err){
                console.log(err);
                res.redirect("back")
            }else{
                res.redirect("back")
            }
        });
    });
});



module.exports = router;