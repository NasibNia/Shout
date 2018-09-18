var db = require('../models');

module.exports = function(app){

  app.get("/api/users", function(req,res){
    //find all the users ;
    db.User.findAll({
      include : [{
        model : db.Shout
      }]

    }).then(function(dbUser){
      // console.log("dbUser   ", dbUser);
      res.json(dbUser);
    });
  });

  // each user has a location , which is varient and needs to be updated 

  // Get single user information
  app.get("/users/:id", function(req,res){
    // a join to include all of the users shouts 
    db.User.findOne({
      where : {
        id : req.params.id
      }
    }).then(function(dbUser){
      // res.json(dbUser);
      res.render("profile", {all:dbUser});
    });
  });

  // Create new user
  app.post("/users",function(req,res){
    //add a new user : happens in login
    console.log("A new user being added!");
    db.User.create(req.body).then(function(dbUser){
      console.log("added user");
      // sends back the id of new inserted object into data base
      console.log("dbUser   inside server  " , dbUser);
      res.render("map", {all:dbUser});
});
  });

  app.delete("/users/:userid", function(req,res){
    db.User.destroy({
      where : {
        id : req.params.id
      }
    }).then(function(dbUser){
      res.json(dbUser);
    });
  });
};