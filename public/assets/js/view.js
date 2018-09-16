$(document).ready(function(){
    var loggedIn = false;
    var usernameInput = $('#username-id');
    var passwordInput = $('#password-id');

    $("#start").on("click", function(event){
        // event.preventDefault();
        $.get("/logIn" , function(data){
            console.log(data);
            window.location.href = "/logIn";
        });    
    });


    $(document).on('click' , '.login-btn' , function(event){
        event.preventDefault();

        // if one of the fields is empty
        if (!usernameInput.val().trim().trim() || !passwordInput.val().trim().trim()) {
            console.log("both fields are required to continue");
            return;
        }
        var userInfo = {
            name : usernameInput,
            password:passwordInput,
            location: "SF"
        };
        console.log("userInfo" , userInfo);

        console.log("pressed button is " + $(this).val());

        if ($(this).val() === "signIn"){
            //go to database and 
            getToAction();

        } else{
            //do the sign Up, add the user 
        }
    });
  
    function getToAction(){
        $.get("/map" , function(data){
            console.log(data);
            window.location.href = "/map";
        });
    }

    $('#shout').on('click', function(event){
        
    });

    $('#see-shouts').on('click', function(event){
        $.get("/api/shouts", function(data){

        });
    });

});