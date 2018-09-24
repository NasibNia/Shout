var db  = require("../models");
var moment = require("moment");

module.exports = function(app){
    
    // Gets all shouts from database and sends back json to render
 
    app.get("/api/shouts", function(req,res){

        db.Shout.findAll({
            include : [{
                // where: query,
                model : db.User
            }],
            order: [
                ['updatedAt', 'DESC']
            ]
        }).then(function(dbShout){
            res.json(dbShout);
        });
    });
    
    // create new shout
    app.post("/shouts", function(req, res){
        console.log("req.body of this group is   ", req.body);
        db.Shout.create({
            body : req.body.body,
            owner: req.body.owner,
            location: req.body.location,
            image: req.body.image,

        }).then(function(dbShout){
            db.UserShout.create({
                UserId : req.body.UserId,
                ShoutId : dbShout.dataValues.id
            }).then(function(pair){
                res.json(dbShout); 
            });
        });          
    });

    app.post("/shouts/:shoutId/:userId", function(req, res){

            db.UserShout.create({
                UserId : req.params.userId,
                ShoutId : req.params.shoutId
            }).then(function(pair){
                res.json(pair); 
            });          
    });
    


    // update a specific shout
    app.put("/shouts/:id" , function(req,res){
        db.Shout.update(
            req.body,  
            {where : {
                id : req.params.id
            }
        }).then(function(dbShout){
            res.json(dbShout);
        });
    });

    //delete shout
    app.delete("/shouts/:id" , function(req,res){
        db.Shout.destroy({
            where : {
                id : req.params.id
            }
        }).then(function(dbShout){
            res.json(dbShout);
        });
    });
};

