$(document).ready(function(){
    var loggedIn = false;
    var usernameInput;
    var passwordInput;
    var currentUserId=-1;
    var userInfo = {
        name : "",
        password:"",
        location: "SF"
    };

    $("#start").on("click", function(event){
        // event.preventDefault();
        $.get("/logIn" , function(data){
            console.log(data);
            window.location.href = "/logIn";
        });    
    });


    $(document).on('submit' , '#login-form' , function(event){
        event.preventDefault();

        usernameInput = $('#username-id').val().trim();
        passwordInput = $('#password-id').val().trim();
    
        if (!usernameInput || !passwordInput) {
            console.log("both fields are required to continue");
            return;
        }
        userInfo = {
            name : usernameInput,
            password:passwordInput,
            location: "SF"
        };

        console.log("user info object is   ", userInfo);

        $.post("/api/users" , userInfo, getCurrentUserId);

        console.log(currentUserId);
    });

    /// these functions handle the map page events

    $(document).on('submit','#todo-form' ,function(event){

       $.get("/api/users",function(results) {
            console.log("all users info from api is    " , results );
            console.log("userInfo      ",userInfo);
            for(var i =0 ; i < results.length ; i++){
                if (results[i].name === usernameInput && results[i].password === passwordInput){
                    console.log("curent user id is  ", results[i].id);
                    currentUserId = results[i].id;
                    break;
       
                }
            }
        });





        console.log("curent user id is  intodo ", currentUserId);
        event.preventDefault();
        var newShout = {
            UserId : currentUserId,
            body : $('#shoutInput').val().trim()
        };
        console.log("new shout is " , newShout);
        makeNewShout(newShout);  
    });

    $('#see-shouts').on('click', function(event){
        getShouts();
        
    });

    function makeNewShout(newShout){
        $.ajax({
            METHOD : "POST",
            url     : "/api/shouts",
            data    : newShout
        }).then(function(result){
            console.log("after makeNewShout ");   
            getShouts();    

        });
    }

    function getUsers(){
        $.get("/api/users",function(results) {
            console.log("all users info from api is    " , results );
            location.reload();
            return results;
        });
    }

    function getShouts(){
        $.get("/api/shouts",function(results) {
            console.log("all shouts info from api is    " , results );
            location.reload();
            return results;
        });
    }

    function getCurrentUserId(){

        $.get("/api/users",function(results) {
            console.log("all users info from api is    " , results );
            console.log("userInfo      ",userInfo);
            for(var i =0 ; i < results.length ; i++){
                if (results[i].name === usernameInput && results[i].password === passwordInput){
                    console.log("curent user id is  ", results[i].id);
                    currentUserId = results[i].id;
                    return currentUserId;
       
                }
            }
        });

        $.get("/map" , function(){
            window.location.href = "/map";
            console.log("after .getmap   ", currentUserId);
        });
    }

});