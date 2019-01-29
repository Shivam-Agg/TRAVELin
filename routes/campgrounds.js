var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var middlewareObj = require("../middleware");

//INDEX ROUTE - Shows all the campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allcampgrounds){
        if(err){
            res.redirect("/");
        }else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds});
        }
    })
    
})

//NEW ROUTE
router.get("/new",middlewareObj.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
})

//CREATE ROUTE
router.post("/",middlewareObj.isLoggedIn, function(req,res){
    var campground = {
        name : req.body.name,
        image : req.body.image,
        description : req.body.description,
        author : {
            id : req.user._id,
            username : req.user.username
        }
    }
    Campground.create(campground, function(err,campground){
        if(err){
            console.log(err);
            req.flash("error","Something went wrong")
        }else{
            console.log(campground);
            req.flash("success","Campground added successfully")
            res.redirect("/campgrounds");
        }
    })
   
})


//SHOW ROUTE
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            res.redirect("back");
        }else{
            res.render("campgrounds/show",{campground:foundcampground});
        }
    })
    
})

//EDIT ROUTE
router.get("/:id/edit",middlewareObj.checkCampgroundOwnership, function(req,res){

    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("campgrounds/edit",{campground : campground});
        }
    })
    
})

//UPDATE ROUTE
router.put("/:id",middlewareObj.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/"+ campground._id);
        }
    })
})

//DELETE ROUTE
router.delete("/:id",middlewareObj.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Campground deleted")
            res.redirect("/campgrounds");
        }
    })
})


module.exports = router;