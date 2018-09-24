var db  = require("../models");
var moment = require("moment");

module.exports = function(app){

    // Renders homepage
    app.get("/", function(req, res){
        res.render("index",{});
    });

    // Renders user profile page
    app.get("/myprofile", function(req, res){
        res.render("myprofile",res);
    });

    app.get("/shouts/:id", function(req,res){
        db.Shout.findAll({
            include : [{
                // where: query,
                model : db.User
            }],
            order: [
                ['updatedAt', 'DESC']
            ]
        }).then(function(dbShout){
            console.log(dbShout.length);
            for (var i = 0; i < dbShout.length; i++) {
                dbShout[i].time = moment(dbShout[i].updatedAt).fromNow();
                dbShout[i].count = dbShout[i].Users.length;
                for (var j = 0; j < dbShout[i].Users.length; j++) {
                    // if user is found in the shout
                    if (dbShout[i].Users[j].id === parseInt(req.params.id)) {

                        dbShout[i].status = true;
                    } else {
                        dbShout[i].status = false;
                    }
                }
            }
            res.render("map" , {allShouts : dbShout});
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
        for (var i = 0 ; i < dbUser.Shouts.length ; i++){
            if (dbUser.Shouts[i].owner === dbUser.name ){
            dbUser.Shouts[i].isOwner = true;
            } else{
            dbUser.Shouts[i].isOwner = false;
            }
        }
        console.log("test dbUser  ", dbUser);
        // res.json(dbUser);
        dbUser.Shouts = dbUser.Shouts.reverse();
        res.render("myProfile", {all:dbUser});
    });
  });

};