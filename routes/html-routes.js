module.exports = function(app){
    app.get("/", function(req, res){
        res.render("homepage",{});
    });

    app.get("/logIn" , function(req,res){

        console.log("in /logIn server")
        res.render("logIn",{});
    });







};