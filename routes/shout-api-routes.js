var db  = require("../models");
var moment = require("moment");

module.exports = function(app){
    
    // Gets all shouts from database and sends back json to render
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
            
            // res.json(dbShout.reverse());
            res.render("map" , {allShouts : dbShout});
        });
    });

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

    // gets all shouts with user id
    // app.get("/shouts/:userid", function(req,res){
    //     // console.log(query)
    //     db.Shout.findAll({
    //         where: {id:req.params.userid},
    //             include : [{
    //             model : db.User
    //         }]
    //     }).then(function(dbShout){
    //         console.log("params\n\n");
    //         console.log(dbShout);

    //         console.log("dbShout is " , dbShout);
    //         // res.json(dbShout);
    //         res.render("myprofile" , {allShouts : dbShout});
    //     });
    // });
    
    // get specific shout from shoutid, 
    // app.get("/shouts/:shoutid", function(req,res){
    //     db.Shout.findOne({ //test this
    //         where : {
    //             id : req.params.id
    //         },
    //         include:[db.User]
    //     }).then(function(dbShout){
    //         res.json(dbShout);
    //     });
    // });
    
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

