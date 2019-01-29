var Comment = require("../models/comment");
var Campground = require("../models/campgrounds");

//all middlewares goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
       Campground.findById(req.params.id,function(err,campground){
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back");
            }else{
               // if(campground.author.id === req.user._id)----------> Cant do this bcos campground.author.id is a mongoose object, so we need to do it another way
                if(campground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","Permission denied");
                    res.redirect("back");
                }
            }
       }) 
    }else{
       req.flash("error","You must be Logged in to do that");
       res.redirect("back") 
    }
}
middlewareObj.checkCommentOwnership = function (req,res,next){
    if(req.isAuthenticated()){
       Comment.findById(req.params.commentid,function(err,comment){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
               // if(campground.author.id === req.user._id)----------> Cant do this bcos campground.author.id is a mongoose object, so we need to do it another way
                if(comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","Permission denied");
                    res.redirect("back");
                }
            }
       }) 
    }else{
        req.flash("error","You must be Logged in to do that");
       res.redirect("back") 
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You must be Logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;