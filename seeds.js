var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
   {name : "Sans Leo",
    image:"https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description : "Beautiful place to Hangout!!!"
   },
   {name : "Rimyy Circle",
    image : "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description : "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
   },
   {name : "Franciso",
    image : "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description : "Beautiful!!"
   }
];

function seedDB(){
    //REMOVE
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Removed All Campgrounds!!");
            /*
            
            for(var i=0;i<data.length;i++){
                //ADD
                Campground.create(data[i],function(err,campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added Campground");
                        //ADDING COMMENT
                        Comment.create({
                            text : "Awesome visit",
                            author : "Harry"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Added Comment!!")
                            }
                        })
                    }
                })
            }
            */
            
        }
    })
}
module.exports = seedDB;