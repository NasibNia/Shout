$(document).ready(function(){
    var loggedIn = false;
    var usernameInput;
    var passwordInput;
    var currentUserId=-1;
    var userInfo = {};

    $("#start").on("click", function(event){
        // event.preventDefault();
        $.get("/logIn" , function(data){
            console.log(data);
            window.location.href = "/logIn";
        });    
    });


    $(document).on('submit' , '#login-form' , function(event){
        event.preventDefault();

        // getShouts();

        usernameInput = $('#username-id').val().trim();
        passwordInput = $('#password-id').val().trim();
    
        if (!usernameInput || !passwordInput) {
            console.log("both fields are required to continue");
            return;
        } else{
            userInfo = {
                name : usernameInput,
                password:passwordInput,
                location: "SF"
            };


        $.post("/api/users" , userInfo, getCurrentUserId);
        // console.log("currentUserId    end of start" , currentUserId);
        // console.log("userInfo    ",userInfo);
        }
    });
    function getCurrentUserId(){

        $.get("/api/users",function(results) {
            console.log("all users info from api is    " , results );
            console.log("userInfo      ",userInfo);
            for(var i =0 ; i < results.length ; i++){
                if (results[i].name === usernameInput && results[i].password === passwordInput){
                    console.log("curent user id is  ", results[i].id);
                    currentUserId = results[i].id;
                    // ;
                    return currentUserId;
       
                }
            }
        });
        $.get("/api/users/user_id=:id" , function(res){
            window.location.href = "/api/users/user_id="+currentUserId;
            console.log("after .getmap   ", currentUserId);
            getShouts(currentUserId);
        });
    }
//==============================================================

    /// these functions handle the map page events

    $(document).on('submit','#todo-form' ,function(event){

        event.preventDefault();
        var userId;
        var url = window.location.href;
        console.log("url is  " , url);
        if (url.indexOf("user_id=") !== -1) {
            userId = url.split("=")[1];
            var newShout = {
                UserId : parseInt(userId),
                body : $('#shoutInput').val().trim()
            };
            console.log("new shout is " , newShout);
            
            makeNewShout(newShout,userId);

            
        } else{
            getShouts();
        }         
    });

    // $('#see-shouts').on('click', function(event){
    //     getShouts();
        
    // });

    function makeNewShout(newShout,id){
        console.log("newShout isisde makeNew shout  ", newShout);
        $.ajax({
            method : "POST",
            url     : "/api/shouts",
            data    : newShout
        }).then(function(){
            console.log("after makeNewShout ");   
            getShouts(id);    

        });
    }

    function getUsers(){
        $.get("/api/users",function(results) {
            console.log("all users info from api is    " , results );
            location.reload();
            return results;
        });
    }

    function getShouts(id){
        var userId = id || "";
        if(userId){
            userId = "/user_id="+userId;
        }
        console.log("userId   "+ userId);
        $.get("/api/shouts"+userId,function(results) {
            // console.log("all shouts info from api is    " , results );
            
            // return results;
        });
        window.location.href = "/api/shouts"+userId;
    }

    

});
