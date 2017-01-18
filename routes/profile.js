var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/profile", function(req, res){
   res.render("auth/profile"); 
});




module.exports = router;