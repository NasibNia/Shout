var db  = require("../models");

module.exports = function(app){
    
    //gettig all the shouts + the name of people who shouted or joined them
    app.get("/api/shouts", function(req,res){
        db.Shout.findAll({
            include : [{
                model : db.User
            }]
        }, function(dbShout){
            res.json(dbShout);
        });
    });

    app.get("/api/shouts/:id", function(req,res){
        db.Shout.findOne({
            where : {
                id : req.params.id
            },
            include:[db.User]
        }).then(function(dbShout){
            res.json(dbShout);
        });
    });
    
    app.post("/api/shouts", function(req, res){
        db.Shout.create({
            body:req.body.body
        }).then(function(dbShout){
            db.UserShout.create({
                UserId : req.body.UserId,
                ShoutId : dbShout.dataValues.id
            }).then(function(pair){
                res.json(dbShout); 
            });
        });          
    });

    app.put("/api/shouts/:id" , function(req,res){
        db.Shout.update(
            req.body,  
            {where : {
                id : req.params.id
            }
        }).then(function(dbShout){
            res.json(dbShout);
        });
    });

    app.delete("/api/shouts/:id" , function(req,res){
        db.Shout.destroy({
            where : {
                id : req.params.id
            }
        }).then(function(dbShout){
            res.json(dbShout);
        });
    });
};


