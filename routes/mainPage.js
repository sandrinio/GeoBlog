var express = require("express");
var router = express.Router();

router.get("/mainPage", function(req, res){
   res.render("mainPage/mainPage");
});

router.get("/mainPage/new", function (req, res) {
   res.render("mainPage/new")
});


module.exports = router;