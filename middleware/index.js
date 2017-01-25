var middlewareObject = {};

    middlewareObject.permissionChecker = function (req, res, next) {
        if(req.isAuthenticated() && req.user.permission === "admin"){
            next();
            } else {
                req.flash("error", "no permission");
                res.redirect("back");
             }
        };


middlewareObject.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }else{
        res.redirect("/")
    }
};

middlewareObject.commentOwner = function (req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, campComment){
            if(err){
                req.flash("error", "something went wrong");
                res.redirect("back");
            }else{
                if(campComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "you are not the owner of this comment");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You have to be logged in");
        res.redirect("back");
    }
};




module.exports = middlewareObject;