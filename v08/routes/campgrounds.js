var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//DISPLAY CAMPGRPUNDS
router.get("/", function(req, res) {
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
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});


// SHOW - Shows more info about one campground
router.get("/:id", function(req, res) {
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

//FORM FOR CREATING NEW CAMPGROUND to db
router.post("/", isLoggedIn, function(req, res) {
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

//middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
