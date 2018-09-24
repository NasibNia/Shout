var db  = require("../models");
var moment = require("moment");

module.exports = function(app){

    // Renders homepage
    app.get("/", function(req, res){
        res.render("index",{});
    });
    
    //And renders the results to the page using the "map" handlebar format
    // this page has a /:id which is the id of the user 
    app.get("/shouts/:id", function(req,res){
        // finds all of the shouts including the information realted to
        // the users who are part of those shouts,
        // In the Descenging order of the time that they got updated
        db.Shout.findAll({
            include : [{
                model : db.User
            }],
            order: [
                ['updatedAt', 'DESC']
            ]
        }).then(function(dbShout){
            // goes through the resutls of the shouts that are found
            for (var i = 0; i < dbShout.length; i++) {
                // gets the time of update and calculates the difference from now and adds it to the shouts object
                dbShout[i].time = moment(dbShout[i].updatedAt).fromNow();
                // calculate the number of the users 
                dbShout[i].count = dbShout[i].Users.length;
                //goes through all them
                for (var j = 0; j < dbShout[i].Users.length; j++) {
                    // if user is found in the shout
                    if (dbShout[i].Users[j].id === parseInt(req.params.id)) {
                        //change the status to true which will be used in handlebar to decide
                        // whether user is alredy joined to the shout or not
                        // if true; join button will not appear on the page
                        dbShout[i].status = true;
                    } else {
                        //if not join button will appear on the page
                        dbShout[i].status = false;
                    }
                }
            }
            //render the shouts info to the page,
            //allShouts include information of body,location,owner,image,
            //as well as time, count, status
            res.render("map" , {allShouts : dbShout});
        });
    });

     // Get single user information with the shouts that user owns
    app.get("/users/:id", function(req,res){
        // a join to include all of the users shouts 
        db.User.findOne({
        where : {
            id : req.params.id
        },
        include: [db.Shout]
        }).then(function(dbUser){
        // goes through all the shouts and check if the name of the user
        // is the same as owner of that specific shout
        for (var i = 0 ; i < dbUser.Shouts.length ; i++){
            if (dbUser.Shouts[i].owner === dbUser.name ){
            // if so, adds the "isOwner" property to the shouts
            // this property will be used in the "myprofile" handlebar to 
            // decide whether to provide the "update" and "delete" options to the user
            // so each user can change the shouts only if they are the ones who made it at the first place
            dbUser.Shouts[i].isOwner = true;
            } else{
            dbUser.Shouts[i].isOwner = false;
            }
        }
        dbUser.Shouts = dbUser.Shouts.reverse();
        //render the results to the page through myProfile handlebars
        res.render("myProfile", {all:dbUser});
    });
  });

};