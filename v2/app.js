var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

//Compile schema into a model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
// }, function(err, campground) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("NEWLY CREATED CAMPGROUND:");
//     console.log(campground);
//   }
// });


app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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

app.listen(3000, function() {
  console.log("The YelpCamp Server Has Started!");
});
