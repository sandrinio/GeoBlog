var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var multer  = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/userPictures/');
    },
    filename: function (req, file, cb) {
        cb(null, req.user.firstname + req.user.lastname + path.extname(file.originalname));
    }
});


var upload = multer({ storage: storage });

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
    });
});


router.put("/avatar", upload.single('user[pic]'), function (req, res) {
    var pic = ({pic: req.file.filename});
    User.findByIdAndUpdate(req.user.id, pic, function (err, userPic) {
        if(err){
            console.log(err);
            res.redirect("back")
        }else{
            res.redirect("back")
        }
    });
});



module.exports = router;