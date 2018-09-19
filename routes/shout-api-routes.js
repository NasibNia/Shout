var db  = require("../models");

module.exports = function(app){
    
    // Gets all shouts from database and sends back json to render
    app.get("/shouts", function(req,res){

        db.Shout.findAll({
            include : [{
                // where: query,
                model : db.User
            }]
        }).then(function(dbShout){
            console.log("yayyyyyyyyyyyyyyyyyyyyyyyyyy\n\n");
            console.log("dbShout is " , dbShout);
            // res.json(dbShout);
            console.log(dbShout);
            res.render("map" , {allShouts : dbShout});
        });
    });

    app.get("/api/shouts", function(req,res){

        db.Shout.findAll({
            include : [{
                // where: query,
                model : db.User
            }]
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
            count : req.body.count,
            status : req.body.status,
            location : req.body.location
        }).then(function(dbShout){
            db.UserShout.create({
                UserId : req.body.UserId,
                ShoutId : dbShout.dataValues.id
            }).then(function(pair){
                res.json(dbShout); 
            });
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

