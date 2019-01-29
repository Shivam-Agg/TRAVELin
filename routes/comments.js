var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");

//SHOWS THE COMMENTS FORM
router.get("/new", middlewareObj.isLoggedIn, function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("comments/new",{campground : campground});
        }
    })
})

//CREATE COMMENT
router.post("/",middlewareObj.isLoggedIn, function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            req.flash("success","Comment added successfully")
                            res.redirect("/campgrounds/"+req.params.id);
                        }
                    })
                }
            })
        }
    })
})

//EDIT ROUTE
router.get("/:commentid/edit",middlewareObj.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.commentid, function(err,comment){
         if(err){
            console.log(err);
            res.redirect("back");
         }else{
            res.render("comments/edit",{campground_id : req.params.id , comment : comment});
         }
    }) 
    
})

//UPDATE ROUTE
router.put("/:commentid",middlewareObj.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.commentid,req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/campgrounds/"+ req.params.id);
                }
    })
    
})

//DELETE ROUTE
router.delete("/:commentid",middlewareObj.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.commentid,function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Comment deleted")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})



module.exports = router;
