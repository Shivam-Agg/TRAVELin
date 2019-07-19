var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    Campground            = require("./models/campgrounds"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user"),
    seedDB                = require("./seeds"),
    passport              = require("passport"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession        = require("express-session"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash");

//REQUIRING ROUTES    
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

app.use(methodOverride('_method'));   
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.set('useFindAndModify', false); 
app.use(flash());

mongoose.connect("mongodb://localhost/yelpcamp",{useNewUrlParser:true});

//PASSPORT CONFIGURATION
app.use(expressSession({
    secret : "I am the best",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/places/:id/comments", commentRoutes);
app.use("/places", campgroundRoutes);
app.use("/", indexRoutes);

app.listen(3000,function(){
    console.log("Travelin Server Has Started!");
})