var db = require('../models');

module.exports = function(app){

  // Gets JSON of all users
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

  // Get single user information with all user shouts
  app.get("/users/:id", function(req,res){
    // a join to include all of the users shouts 
    db.User.findOne({
      where : {
        id : req.params.id
      },
      include: [db.Shout]
    }).then(function(dbUser){
      // res.json(dbUser);
      dbUser.Shouts = dbUser.Shouts.reverse();
      res.render("myprofile", {all:dbUser});
    });
  });
  
  // Gets JSON of users and shouts
  app.get("/api/users/:id", function(req,res){
    // a join to include all of the users shouts 
    db.User.findOne({
      where : {
        id : req.params.id
      },
      include: [db.Shout]
    }).then(function(dbUser){
      // res.json(dbUser);
      res.json(dbUser);
    });
  });
  
  // Create new user
  app.post("/api/users/",function(req,res){
    console.log(req.body);
    //add a new user : happens in login
    console.log("A new user being added!");
    db.User.create(req.body).then(function(dbUser){
      console.log("added user");
      // sends back the id of new inserted object into data base
      console.log("dbUser   inside server  " , dbUser);
      console.log(dbUser);
      res.json(dbUser);
});
  });

  // Delete user from database
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