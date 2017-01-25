var express = require("express");
var User = require("../models/user");
var router = express.Router();
var middleware = require("../middleware")


router.get("/offices", middleware.isLoggedIn, function (req, res) {
    User.find({}, function (err, user) {
        if(err){
            console.log(err);
        }else{
            res.render("offices/offices", {user: user});
        }
    });
});


module.exports = router;