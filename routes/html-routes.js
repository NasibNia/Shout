module.exports = function(app){
    app.get("/", function(req, res){
        res.render("homepage",{});
    });

    app.get("/logIn" , function(req,res){
        res.render("logIn",{});
    });

    app.get("/map" , function(req,res){
        res.render("map",{});
    });







};