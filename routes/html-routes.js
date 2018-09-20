module.exports = function(app){

    // Renders homepage
    app.get("/", function(req, res){
        res.render("index",{});
    });

    // Renders user profile page
    app.get("/myprofile", function(req, res){
        res.render("myprofile",res);
    });

    // Renders main page
//     app.get("/map", function(req, res) {
//         res.render("map", res)
//     })
}; 