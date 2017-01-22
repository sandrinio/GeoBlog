var express = require("express");
var User = require("../models/user");
var router = express.Router();


router.get("/offices", function (req, res) {
    User.find({}, function (err, user) {
        if(err){
            console.log(err);
        }else{
            res.render("offices/offices", {user: user});
        }
    });
});










module.exports = router;