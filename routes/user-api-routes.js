var db = require('../models');

module.exports = function(app){

  // Gets JSON of all users
  app.get("/api/users", function(req,res){
    //find all the users; and include the info of the shouts they own
    db.User.findAll({
      include : [{
        model : db.Shout
      }]

    }).then(function(dbUser){
      // return the info of the users as the json object
      res.json(dbUser);
    });
  });
 
  // get the information of a specific user and include the 
  // information of all the shouts that that user owns
  app.get("/api/users/:id", function(req,res){
    // a join to include all of the users shouts 
    db.User.findOne({
      where : {
        id : req.params.id
      },
      include: [db.Shout]
    }).then(function(dbUser){
      // return the results as a json object
      res.json(dbUser);
    });
  });
  
  // Create new user
  app.post("/api/users/",function(req,res){
    //add a new user : happens in login
    db.User.create(req.body).then(function(dbUser){
      // sends back the results as json object
      res.json(dbUser);
    });
  });

  // Delete a specific user from database
  app.delete("/users/:userid", function(req,res){
    db.User.destroy({
      where : {
        id : req.params.id
      }
    }).then(function(dbUser){
      // return response as json object
      res.json(dbUser);
    });
  });
};