var userInfo = {};


$(document).ready(function(){
    var loggedIn = false;
    var usernameInput;
    var passwordInput;
    var currentUserId=-1;

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
            email: "potato@potato.com",
            imgUrl: "www"
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
                UserId : getUserId(),
                body : $('#shoutInput').val().trim(),
                count : 1,
                status : true,
                location:"sf"
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
        var id = getUserId();
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

    function getUserId() {
        return userInfo.id;
    }
    
    // console.log("user ID is: " + getUserId())

    //~~~~~~~~~~~~~~ Nasib
    //when clicking on stat button: false --> text is join  /true ---> text is update
    // when a user wants to join someone elses shout: if the btn is set to join, by clicking on it it should toggle to update and increase the shout count by 1
    $('.stat-btn').on('click', function(event){
        
        var updateShout = {};
        var status = $(this).attr('data-stat');
        var id = $(this).attr('data-id');
        var count = $(this).attr('data-count');

        // if stat = false meaning the user hasn't joined this shout yet
        // we get the shout id, update the count of that shout, and reload the page
        if (status === "false") {
            // we update the count and status
            updateShout = {
                count : parseInt(count)+1,
                status : true
            };
        } // else: meaning that user has already belongs to this shout , and the label is set to update 
        else {
            // we update the body 
            var body = "new text";
            updateShout = {
                body : body
            };
        }
        $.ajax({
            method : "PUT",
            url : "/shouts/" + id,
            data : updateShout
        }).then(function(result){
            console.log("shout updated!");
            location.reload();
        });
    
    });


    $('.del-btn').on('click', function(event){
        var id = $(this).attr('data-id');

        $.ajax({
            method : "DELETE",
            url : "/shouts/" + id,         
        }).then(function(data){
            location.reload();
        });


    });






});

var userInfo = {};

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    userInfo.name = profile.getName();
    userInfo.email = profile.getEmail();
    var imgUrl = profile.getImageUrl();
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var email = userInfo.email;
    $.get("/api/users/", function(results){
        console.log(results);
        for (var i = 0; i < results.length; i++){
            console.log(results[i].email);
            console.log(email);
            if (results[i].email === email) {
                userInfo.id = results[i].id;
            }
        }

        if (!userInfo.id) {
        console.log("create new user");
        var newUser = {
                name: userInfo.name, 
                email: email,
                imgUrl: imgUrl
            };
        $.post("api/users", newUser).then(function() {
            location.reload();
        });
    }
    });


    $(document).on('click', '.home-btn', function(event){
        window.location.href = "/shouts";
    });



}
  