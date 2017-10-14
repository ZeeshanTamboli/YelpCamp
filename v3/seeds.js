var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
    name: "Rusticville Camping Ground",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/02/4a/a9/0f/campsite.jpg",
    description: "Rusticville is a camping destination and offers a delightful ambience to set a camp and enjoy the night with your family and friends. Simple but sumptuous local food for dinner and breakfast along with barbecue in the evening ensures you never feel hungry. Nature walk, trek to Tikona fort or a hike down to the lake are some of the adventure activities that one can enjoy apart from the liesure outdoor games like volleyball, football, badminton, archery and cricket. A walk in the farms nearby or plucking fruits from trees is an experience to relish."
  },
  {
    name: "Pawana Lakeside Camping",
    image: "https://adventures365.in/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/p/a/pavana_lake_camping1_3.jpg",
    description: "Pawana Lake is an artificial lakes in the vicinity of Pune. It is 10 Kms off Kamshet on the old Mumbai-Pune highway, this lake came into existence after the construction of the Pawana Dam, and now it plays a scenic host for camp site. The overnight stay will be in tents nest to the lake. Depending on the group size, 2 men, 4 men or 8 men tent will be provided. "
  },
  {
    name: "Letscampout Rajmachi Campsite",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/06/32/80/f6/letscampout-rajmachi.jpg",
    description: "Camping in Rajmachi is a unique experience combining adventure with its historical roots that hark back to Shivaji's campaign against the Mughals. Chhatrapati chose to fortify Rajmachi as it provides a vantage point overlooking Borghat — a crucial mountain passage connecting Mumbai and Pune. The Rajmachi peak is home to two forts — Shrivardhan and Manaranjan, which provide an excellent trekking route. The campsite has its own lake, which also hosts an ancient Shiv temple. The lake brims with water throughout the year and lets you experience fish pedicures as well."
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
