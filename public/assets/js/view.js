$(document).ready(function(){
    var loggedIn = false;
    var usernameInput;
    var passwordInput;
    var currentUserId=-1;
    var userInfo = {};

    $("#start").on("click", function(event){
        // event.preventDefault();
        $.get("/shouts" , function(data){
            console.log(data);
            window.location.href = "/shouts";
        });    
    });


    $(document).on('submit' , '#login-form' , function(event){
        event.preventDefault();

        // getShouts();
        userInfo = {
            name : "Potato",
            email: "potato@potato.com"
        };
        // usernameInput = $('#username-id').val().trim();
        // passwordInput = $('#password-id').val().trim();
    
        // if (!usernameInput || !passwordInput) {
        //     console.log("both fields are required to continue");
        //     return;
        // } else{



        $.post("/users" , userInfo, function(data) {
            console.log(data);
        // console.log("currentUserId    end of start" , currentUserId);
        // console.log("userInfo    ",userInfo);
        })
    })

    // function getCurrentUserId(){

    //     $.get("/api/users",function(results) {
    //         console.log("all users info from api is    " , results );
    //         console.log("userInfo      ",userInfo);
    //         for(var i =0 ; i < results.length ; i++){
    //             if (results[i].name === usernameInput && results[i].password === passwordInput){
    //                 console.log("curent user id is  ", results[i].id);
    //                 currentUserId = results[i].id;
    //                 // ;
    //                 return currentUserId;
       
    //             }
    //         }
    //     });
    //     $.get("/api/users/user_id=:id" , function(res){
    //         window.location.href = "/api/users/user_id="+currentUserId;
    //         console.log("after .getmap   ", currentUserId);
    //         getShouts(currentUserId);
    //     });
    // }
//==============================================================

    /// these functions handle the map page events

    $(document).on('submit','#todo-form' ,function(event){

        event.preventDefault();
 
            var newShout = {
                UserId : 1,
                body : $('#shoutInput').val().trim()
            };
            console.log("new shout is " , newShout);
            
            $.ajax({
                method : "POST",
                url     : "/shouts",
                data    : newShout
            }).then(function(data){
                console.log("New shout created");   
                    
                location.reload();

            });
    
    });

    $('#see-shouts').on('click', function(event){
        var id = getUserID();
        window.location.href = "/users/" + id;
        // $.get("/shouts/" + id, function(results) {
        //     console.log("getting shouts from userID: " + id)
        // }).then(function(data){
        //     window.location.href = "/myprofile";
        // })


        
    });

    function makeNewShout(newShout){

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
        $.get("/shouts"+userId,function(results) {
            // console.log("all shouts info from api is    " , results );
            
            // return results;
        });
        window.location.href = "/shouts";
    }

    

});

function getUserID() {
    // var email = profile.getEmail();
    return 1;
}