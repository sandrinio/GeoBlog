var express = require("express");
var router = express.Router();

router.get("/mainPage", function(req, res){
   res.render("mainPage/mainPage");
});

module.exports = router;