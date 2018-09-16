$(document).ready(function(){
    var loggedIn = false;

    $("#start").on("click", function(event){
        // event.preventDefault();
        $.get("/logIn" , function(data){
            console.log(data);
            window.location.href = "/logIn";
        });
    });



});