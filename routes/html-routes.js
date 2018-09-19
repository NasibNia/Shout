module.exports = function(app){
    app.get("/", function(req, res){
        res.render("homepage",{});
    });

    app.get("/myprofile", function(req, res){
        res.render("myprofile",{});
    });
};