var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name: "Rusticville Camping Ground",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/02/4a/a9/0f/campsite.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam consectetur temporibus, unde autem. Recusandae eligendi illo, debitis! Itaque officia eligendi dignissimos odio autem officiis cumque, neque dolor, magnam distinctio suscipit pariatur provident voluptates quaerat dolores, aspernatur quae. Ut ipsa fugit, velit atque temporibus beatae fugiat quidem cum ab! Deserunt, maiores."
  },
  {
    name: "Pawana Lakeside Camping",
    image: "https://adventures365.in/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/p/a/pavana_lake_camping1_3.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam consectetur temporibus, unde autem. Recusandae eligendi illo, debitis! Itaque officia eligendi dignissimos odio autem officiis cumque, neque dolor, magnam distinctio suscipit pariatur provident voluptates quaerat dolores, aspernatur quae. Ut ipsa fugit, velit atque temporibus beatae fugiat quidem cum ab! Deserunt, maiores."
  },
  {
    name: "Letscampout Rajmachi Campsite",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/06/32/80/f6/letscampout-rajmachi.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam consectetur temporibus, unde autem. Recusandae eligendi illo, debitis! Itaque officia eligendi dignissimos odio autem officiis cumque, neque dolor, magnam distinctio suscipit pariatur provident voluptates quaerat dolores, aspernatur quae. Ut ipsa fugit, velit atque temporibus beatae fugiat quidem cum ab! Deserunt, maiores."
  }
];


function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed all campgrounds");
    data.forEach(function(seed) {
      //add a few campgrounds
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a campground");
          //create a comment
          Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created new comment!");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
