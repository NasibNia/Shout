module.exports = function(app){
    app.get("/", function(req, res){
        res.render("index",{});
    });

    app.get("/myprofile", function(req, res){
        res.render("myprofile",{res});
    });
};