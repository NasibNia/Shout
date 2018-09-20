var userInfo = {
    name : localStorage.getItem("name"),
    email : localStorage.getItem("email"),
    imgUrl: localStorage.getItem("imgUrl"),
    id : localStorage.getItem("id")

};




$(document).ready(function(){
    //toggle `popup` / `inline` mode
    $.fn.editable.defaults.mode = 'popup';       
    //make username editable
    $('#username').editable({
        mode: 'inline',
    });
    $('.hours').editable({
        mode: 'inline',
        type: 'number',
        step: '1.00',
        min: '0.00',
        max: '24'
    });


    var usernameInput;
    var passwordInput;
    var currentUserId=-1;

    $("#start").on("click", function(event){
        document.getElementById('goog').click();   
    });






    /// these functions handle the map page events

    $(document).on('submit','#todo-form' ,function(event){

        event.preventDefault();
        if (getUserId()){
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
        } else {
            alert("User not logged in.")
        }
    });

    $('#see-shouts').on('click', function(event){
        if (getUserId()) {
            var id = getUserId();
            window.location.href = "/users/" + id;
            // $.get("/shouts/" + id, function(results) {
            //     console.log("getting shouts from userID: " + id)
            // }).then(function(data){
            //     window.location.href = "/myprofile";
            // })

        } else {
            alert("User not logged in.")
        }        
    });

    // function makeNewShout(newShout){

    // }

    // function getUsers(){
    //     $.get("/api/users",function(results) {
    //         console.log("all users info from api is    " , results );
    //         location.reload();
    //         return results;
    //     });
    // }

    // function getShouts(id){
    //     var userId = id || "";
    //     if(userId){
    //         userId = "/user_id="+userId;
    //     }
    //     console.log("userId   "+ userId);
    //     $.get("/shouts"+userId,function(results) {
    //         // console.log("all shouts info from api is    " , results );
            
    //         // return results;
    //     });
    //     window.location.href = "/shouts";
    // }


    
    // console.log("user ID is: " + getUserId())

    //~~~~~~~~~~~~~~ Nasib
    //when clicking on stat button: false --> text is join  /true ---> text is update
    $('.update-btn').on('click', function(event){
        
        var updateShout = {};
        // var status = $(this).attr('data-stat');
        var id = $(this).attr('data-id');
        console.log(id);
        var value = $(".updateShout" + id).val();
        console.log("value: " + value)
        // if stat = false meaning the user hasn't joined this shout yet
        // we get the shout id, update the count of that shout, and reload the page
        if (status === "false") {
            // we update the count and status
            updateShout = {
                count : parseInt(count) + 1,
                // status : true
            };
        } // else: meaning that user has already belongs to this shout , and the label is set to update 
        else {
            // we update the body 
            var body = value;
            updateShout = {
                body : body
            };
        } // need to update count here and relationship table
        $.ajax({
            method : "PUT",
            url : "/shouts/" + id,
            data : updateShout
        }).then(function(result){
            console.log("shout updated!");
            location.reload();
        });
    
    });

    // when a user wants to join someone elses shout: if the btn is set to join, by clicking on it it should disapear and count goes up by 1
    $('.join-btn').on('click', function(event){



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


// Signs in user to google, creates user if not in database, stores local variables
function onSignIn(googleUser) {
    localStorage.clear();

    var profile = googleUser.getBasicProfile();

    localStorage.setItem("name", profile.getName());
    localStorage.setItem("email", profile.getEmail());
    localStorage.setItem("imgUrl", profile.getImageUrl());


    
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    // userInfo.name = profile.getName();
    console.log('Image URL: ' + profile.getImageUrl());
    // var imgUrl = profile.getImageUrl();
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // userInfo.email = profile.getEmail();


    var email = localStorage.getItem("email");
    $.get("/api/users/", function(results){

        console.log(results);
        var found = false;
        for (var i = 0; i < results.length; i++){
            console.log(email)
            console.log(results[i].email)
            if (results[i].email === email) {


                console.log("User exists")
                found = true;
                userInfo.id = results[i].id;
                localStorage.setItem("id", results[i].id);
                gapi.auth2.getAuthInstance().signOut()

                window.location.href = "/shouts/" + userInfo.id;
            }
        }
        console.log(userInfo)
        if (!found) {
        console.log("create new user");
        var newUser = {
                name: localStorage.getItem("name"), 
                email: localStorage.getItem("email"), 
                imgUrl: localStorage.getItem("imgUrl"), 
            };
        $.post("api/users", newUser, function(data) {
            console.log(data.id)
            localStorage.setItem("id", data.id);
            gapi.auth2.getAuthInstance().signOut()

            window.location.href = "/shouts/" + data.id;
        }) 
    }
    })
        // gapi.auth2.getAuthInstance().signOut()

        // window.location.href = "/shouts";





}
// Home button on click function
$(document).on('click', '.back-btn', function(event){
    window.location.href = "/shouts/" + getUserId();
});

// Sign out function
// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }

// Sign out on click
  $(document).on('click', '#signout', function(event){
    console.log("signing out")
    localStorage.clear();
    userInfo = {};
    window.location.href = "/";

    // signOut();
})    
function getUserId() {
    return userInfo.id;
}