var express = require("express");
var app = express();

var mongoose       = require("mongoose"),
    methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
    session        = require("express-session"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),

    User           = require("./models/user");




var authRoutes    = require("./routes/auth"),
    mainRoutes    = require("./routes/mainPage"),
    profileRoutes = require("./routes/profile"),
    quizzRoutes   = require("./routes/miniTests"),
    officesRoutes = require("./routes/offices"),
    commentRoutes = require("./routes/comments");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use(mainRoutes);
app.use(profileRoutes);
app.use(quizzRoutes);
app.use(officesRoutes);
app.use(commentRoutes);

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://sandro:sandro1234@ds054479.mlab.com:54479/geocell_blog");
//mongoose.connect("mongodb://localhost/geocell_blog");





/* ============================            ============================ */
//ეს ყოველთვის უცვლელია და არის ბოლოში


app.listen(process.env.PORT || 3000, process.env.IP,function () {  //if server is on
    console.log("======STARTED======");
});