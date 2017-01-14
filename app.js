var express = require("express");
var app = express();

var mongoose       = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash");


var authRoutes = require("./routes/auth");
   // mainRoutes = require("./routes/mainPage");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(authRoutes);
//app.use(mainRoutes);


//mongoose.connect("mongodb://admin:admin@ds054479.mlab.com:54479/geocell_blog");
mongoose.connect("mongodb://localhost/geocell_blog");



/* ============================            ============================ */
//ეს ყოველთვის უცვლელია და არის ბოლოში

app.listen(3000, function () {  //if server is on
    console.log("======STARTED======");
});