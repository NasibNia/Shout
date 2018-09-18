module.exports = function(app){
    app.get("/", function(req, res){
        res.render("homepage",{});
    });

    app.get("/profile", function(req, res){
        res.render("profile",{});
    });
};