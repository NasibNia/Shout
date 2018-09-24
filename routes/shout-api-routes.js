var db  = require("../models");
var moment = require("moment");

module.exports = function(app){
    
    // Gets all shouts from database and sends back json to render
    app.get("/api/shouts", function(req,res){

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
            // and returnign them as the json object
            res.json(dbShout);
        });
    });
    
    // create new shout
    app.post("/shouts", function(req, res){
        //create new shouts with the binformation gattered from 
        //the client side request including body,owner of the shout,
        //location and image
        db.Shout.create({
            body : req.body.body,
            owner: req.body.owner,
            location: req.body.location,
            image: req.body.image,

        }).then(function(dbShout){
            //then create a new row in the table UserShout which is the 
            //table of relationship betwee the shouts and users
            db.UserShout.create({
                UserId : req.body.UserId,
                ShoutId : dbShout.dataValues.id
            }).then(function(pair){
                //return the newly created shout as a jason object
                res.json(dbShout); 
            });
        });          
    });

    app.post("/shouts/:shoutId/:userId", function(req, res){
        // create a new user id relationship with a specific shout 
        // this happens when a new user wants to join a shout
        db.UserShout.create({
            UserId : req.params.userId,
            ShoutId : req.params.shoutId
        }).then(function(pair){
            // return the newly created realtionship as json object
            res.json(pair); 
        });          
    });
    


    // update a specific shout
    app.put("/shouts/:id" , function(req,res){
        //update the body of the shout where the id is provided in the url
        db.Shout.update(
            req.body,  
            {where : {
                id : req.params.id
            }
        }).then(function(dbShout){
            //return the newly updated shout as json object
            res.json(dbShout);
        });
    });

    //delete shout
    app.delete("/shouts/:id" , function(req,res){
        //delete the body of shout where the id is provided in the url
        db.Shout.destroy({
            where : {
                id : req.params.id
            }
        }).then(function(dbShout){
            res.json(dbShout);
        });
    });
};

