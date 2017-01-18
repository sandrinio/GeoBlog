var express = require("express");
var router = express.Router();

router.get("/mainPage", function(req, res){
   res.render("mainPage/mainPage");
});

router.get("/mainPage/new", function (req, res) {
   res.render("mainPage/new")
});

router.post("/mainPage", function (req, res) {
   console.log(req.body.editor);
   res.render("mainPage/new")
});

router.get("/mainPage/offices", function (req, res) {
   res.render("mainPage/offices");
});



module.exports = router;