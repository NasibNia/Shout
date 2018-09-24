// the gereral scheme of the object userInfo, this object si populated upon signing in
var userInfo = {
    name : localStorage.getItem("name"),
    email : localStorage.getItem("email"),
    imgUrl: localStorage.getItem("imgUrl"),
    id : localStorage.getItem("id")
};

// upon the load of the page:
$(document).ready(function(){
    
    // the start button is wired to the element by the id 'goog' which is the 'google sign in ' button on the welcome page
    $("#start").on("click", function(event){
        document.getElementById('goog').click();   
    });

    /// these functions handle the map page events
    $(document).on('submit','#shout-form' ,function(event){

        event.preventDefault();
        // To create a new shout after loging in:
        if (getUserId()){
            //create the new shout based by collecting the info from the google login and the body of shout made in the shout form
            var newShout = {
                UserId : getUserId(),
                body : $('#shoutInput').val().trim(),
                owner : userInfo.name,
                location: "",
                image: userInfo.imgUrl
            };

            // make an ajax call to the server to post the shout
            $.ajax({
                method : "POST",
                url     : "/shouts",
                data    : newShout
            }).then(function(data){
                location.reload();
            });
        } 
    });

    // To see the shouts on the profile page:
    $('#see-shouts').on('click', function(event){
        if (getUserId()) {
            // redirecting to the user profile page
            var id = getUserId();
            window.location.href = "/users/" + id;
        } else {
            alert("You need to log in first");
        }        
    });

    //when clicking on stat button: false --> text is join  /true ---> text is update
    $('.update-btn').on('click', function(event){
        
        var updateShout = {};
        var id = $(this).attr('data-id');
        var value = $(".updateShout" + id).val();
        // we update the body 
        var body = value;
        updateShout = {
            body : body
        };
        // make a put request to update the shout with the new body text
        $.ajax({
            method : "PUT",
            url : "/shouts/" + id,
            data : updateShout
        }).then(function(result){
            //reloding the page
            location.reload();
        });
    
    });

    // when a user wants to join someone else's shout: if the btn is set to join, by clicking on it it should disapear and count goes up by 1
    $('.join-btn').on('click', function(event){
        var shoutId =  $(this).attr('data-id');
        var userId =getUserId();
        // ajax call to the server to post the shout with the current shout id and the current user id
        $.ajax({
            method : "POST",
            url : "/shouts/" + shoutId + "/"+ userId,
        }).then(function(result){
            //reloding the page
            location.reload();
        });
    });

    // when the delete button is pressed 
    $('.del-btn').on('click', function(event){
        //collecting the id of the shout
        var id = $(this).attr('data-id');
        // send an ajax call to the server to delete the shout with that specific id
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

    // getting the profile information from google
    var profile = googleUser.getBasicProfile();

    // storing the information on local storage to be able to check later on whether the user has already signed in or not
    localStorage.setItem("name", profile.getName());
    localStorage.setItem("email", profile.getEmail());
    localStorage.setItem("imgUrl", profile.getImageUrl());


    var email = localStorage.getItem("email");
    //getting the list of all the users in the database
    $.get("/api/users/", function(results){
        // set the boolean value found to false
        var found = false;
        for (var i = 0; i < results.length; i++){
            //if the user's email already exists in the database of our currently signed in users
            if (results[i].email === email) {

                // user already exists:
                found = true;
                //get the id of the user and update the id in the local storage to that id
                userInfo.id = results[i].id;
                localStorage.setItem("id", results[i].id);
                //end of authentication process
                gapi.auth2.getAuthInstance().signOut();
                //redirect the window to the shouts/userId page
                window.location.href = "/shouts/" + userInfo.id;
            }
        }
        // if the user is not found in the list of currently signed in users
        if (!found) {
            //creating a new user with the info collected from google profile of the user
            var newUser = {
                name: localStorage.getItem("name"), 
                email: localStorage.getItem("email"), 
                imgUrl: localStorage.getItem("imgUrl"), 
            };
        // make an ajax call to the api/users to add the user to the list of currently signed in users
        $.post("api/users", newUser, function(data) {
            //setting the id of the user to the local stroage
            localStorage.setItem("id", data.id);
            // end of authentication process
            gapi.auth2.getAuthInstance().signOut();
            // redirecting the window to the shouts/userId
            window.location.href = "/shouts/" + data.id;
        });
    }
    });
}
// back button on click function
$(document).on('click', '.back-btn', function(event){
    // reloding the window to the shouts page/user id
    window.location.href = "/shouts/" + getUserId();
    window.scroll(0,-1000);
});

// Sign out on click
  $(document).on('click', '#signout', function(event){
    //signing out and clearing the local storage and userInfo
    localStorage.clear();
    userInfo = {};
    // getting back to the welcome page
    window.location.href = "/";
});

//getting the user id
function getUserId() {
    return userInfo.id;
}