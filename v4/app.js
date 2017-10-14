var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground");
    seedDB     = require("./seeds");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

//INDEX
app.get("/", function(req, res) {
  res.render("landing");
});

//DISPLAY CAMPGRPUNDS
app.get("/campgrounds", function(req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
});

//CREATE CAMPGROUND
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});


// SHOW - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//FORM FOR CREATING NEW CAMPGROUND
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  //Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds"); //GET route of "/campgrounds"
    }
  });
});

// ============================
//COMMENT ROUTES
// ============================

app.get("/campgrounds/:id/comments/new", function(req, res) {
  //find by id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
        res.render("comments/new", {campground: campground});
    }
  });
});


app.listen(3000, function() {
  console.log("The YelpCamp Server Has Started!");
});
