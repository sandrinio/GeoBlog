var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/img' });

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

router.put("/avatar", upload.any("avatar"), function (req, res) {
    console.log(req.files);
    res.redirect("back")
});



module.exports = router;