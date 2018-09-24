# Shout

This fun application is an easy way of putting events on the map in real time through the crowdsource. And that's right; we named it Shout; to shout the events around you and invite others to join the crowd. Whether there is an accident near by or a free concert happening couple blocks down, the user can shout this experience to have it be seen by everyone.  

![index](public/assets/images/Screen1.png)

# Getting Started

Go to the [SHOUT](https://shout-it-out.herokuapp.com/) website; and before going any further don't forget to scroll down, sit back and watch our fun shoutting animation for a while. 

![shout](public/assets/images/shout.gif)

By clicking on the sign in button you will be automatically directed to google sign in page, in which you can choose your google account and sign in. 
You'll be automatically directed to the main shout page. 

![mainPage](public/assets/images/mapPage.gif)

In this page you can shout the events that are happening around you Or see the ones from other shouters and join those that interest you. The shouts' locations are supposed to show on the map on the right hand side and listed on the left.

![seeShouts](public/assets/images/seeShouts.gif)

You can also navigate to your profile page by clicking the "Your Shouts!" button. In this page you can see the list of your shouts, or the shouts that you joined. you can delete and update the shouts that you originally made.

![profilePage](public/assets/images/profile.gif)


### Prerequisites

You can access this site from any internet browser including: [Google Chrome](https://www.google.com/chrome/), [Firefox](https://www.mozilla.org/en-US/firefox/new/), or [safari](https://www.apple.com/safari/). Although, regardless of the browser you use, you would still need a google account since our authentication process happens through the google.

## Deployment

The site is deployed through [heroku](https://shout-it-out.herokuapp.com/), and uses the "JawsDB MySQL" to manage the database in real time. All the information regarding users and the shouts and their relationship is stored, accessed and updated thorugh this database.

## Built With

* HTML
* CSS (Grid)
* [Bootstrap](https://getbootstrap.com/)
* JavaScript / [jQuery](https://jquery.com/)
* [Moment.js](https://momentjs.com/)
* [MySQL](https://www.mysql.com)
* [Heroku](https://www.heroku.com/)
* [JQuery](https://jquery.com)
* [NPM](https://www.npmjs.com/)
    - Sequelize
    - Express
    - Handlebars
    - Body-parser

## APIs and Libraries 

* [Google Authentication](https://developers.google.com/api-client-library/javascript/features/authentication)

    Allowed user to sign in with their Gmail account and also takes their information such as image and name to use for identifying each user for our site. 

* [Google Maps API](https://cloud.google.com/maps-platform/)

    Allowed us to generate the map and to get the current location of users.

* [UIkit](https://getuikit.com/)

    Cool CSS Library we used to organize everything and assist in the animation. 

* [Animaker](https://www.animaker.com/)

    Useful website for making animations and then we used Screencast to turn them to gifs for the opening page of the website. 

## Wireframe and Client Side Layouts
The very initial wireframe looked like this 

![design](public/assets/images/Screen3.jpg| width=100)

And as the code evolved turned into three different pages; welcome page, main page , and profile page, each of which are created through handlebars. The server listens for the request made by the client side, does the set of appropriate actions and renders the responses back to the corresponding pages through handlebars.


## Tasks:
Here is the scheme of our contributions to the project:

### [Nasib](https://github.com/NasibNia) & [Andrew](https://github.com/atton88)  

We spent a considerable amount of time together as pair programmers, to build the features and fix the bugs on both client and server side.

- Front end javascript codes:
- Server side javascript codes:
- handling handlebars

#### Some of our Code Snippets

**Client Side codes:**

This block of the code shows the what happens when a new shout is being made by a specific user who is already logged in through google authentication
- A new shout object is being made and populated by collecting the info from the google login and the body of shout made in the shout form
- It, then , makes an ajax call to the server to post the shout

```
$(document).on('submit','#shout-form' ,function(event){
    event.preventDefault();
    if (getUserId()){
        var newShout = {
            UserId : getUserId(),
            body : $('#shoutInput').val().trim(),
            owner : userInfo.name,
            location: "",
            image: userInfo.imgUrl
        };
        $.ajax({
            method : "POST",
            url     : "/shouts",
            data    : newShout
        }).then(function(data){
            location.reload();
        });
    } 
});
```
This block of code shows what happens when a user decides to update a shout; 
- Since handlebar takes a hold on the id of each shout, by clicking on each shout the id could be grabed.
- The body will be then grabbed from whatever the user has entered in the form,
- Then, a put ajax call will be made to update the body of the shout in the shouts/id
- The window will be reloaded again, which means grabbing all the shouts including the updated one from database and rendering on the page. This happens on the server side and will be covered in the following snippets of the codes.
```
$('.update-btn').on('click', function(event){       
    var updateShout = {};
    var id = $(this).attr('data-id');
    var value = $(".updateShout" + id).val();
    var body = value;
    updateShout = {
        body : body
    };
    $.ajax({
        method : "PUT",
        url : "/shouts/" + id,
        data : updateShout
    }).then(function(result){
        location.reload();
    });   
});
```
This snippets of the code shows what happens when the join button next to each shout will be clicked by a user
- The code first grabs the id of tha specific shout
- It then makes an ajax call to the server to join the current user id to that shout. For this purpose a new relationship between that user id and that shout id should be established in the UserShout table.
- The page will be reloaded by grabbing all the shouts information including the most recent join.

```
$('.join-btn').on('click', function(event){
    var shoutId =  $(this).attr('data-id');
    var userId =getUserId();
    $.ajax({
        method : "POST",
        url : "/shouts/" + shoutId + "/"+ userId,
    }).then(function(result){
        location.reload();
    });
});
```
This snippet of the code shows what happens when a user decides to click the delete button. 
- the id of that specific shout will be grabbed
- and an ajax call will be made to the server to delete that shout
- The page will be reloaded by grabbing all the shouts information including the most recent deletion.
```
$('.del-btn').on('click', function(event){
    var id = $(this).attr('data-id');
    $.ajax({
        method : "DELETE",
        url : "/shouts/" + id,         
    }).then(function(data){
        location.reload();
    });
});
```
**Server Side codes:**

This block of code renders the right information on the profile page. It works with the id of the user in the route and finds that specific user and includes the shouts information.
- It then, goes through all the shouts and check if the name of the user is the same as owner of that specific shout.
- If so, adds the "isOwner" property to the shouts 
- This property will be used in the "myprofile" handlebar to decide whether to provide the "update" and "delete" options to the user, so each user can change the shouts only if they are the ones who made it at the first place
- It then, renders the results to the page through myProfile handlebars

```
 // Get single user information with the shouts that user owns
    app.get("/users/:id", function(req,res){
        db.User.findOne({
        where : {
            id : req.params.id
        },
        include: [db.Shout]
        }).then(function(dbUser){

        for (var i = 0 ; i < dbUser.Shouts.length ; i++){
            if (dbUser.Shouts[i].owner === dbUser.name ){
            dbUser.Shouts[i].isOwner = true;
            } else{
            dbUser.Shouts[i].isOwner = false;
            }
        }
        dbUser.Shouts = dbUser.Shouts.reverse();
        res.render("myProfile", {all:dbUser});
    });
  });
```


This block of code renders the information on the shout page of each user. It gets all the shouts, currently existing in database, and renders them to the window using the "map" handlebar format.The page has a /:id which is the id of that specific user.
This id will be provided from the client side. The code , then, finds all of the shouts including the information related to all of the users who are part of those shouts in the Descenging order of the time that they got updated. It, then, 
- goes through the resutls of the shouts that are found
- gets the "time of update" and calculates the difference from now and adds it to the shouts object
- It also calculates the number of the users and  
- Goes through all them to see if the user is part of that shout. This will be used later in client side handlebar to decide whether user is alredy joined to the shout or not
- And, changes the status to true; which means join button will not appear on the page
- Otherwise, user would see a join button on the page next to that shout so that they can join if they want to
- Finally , the results will be rendered to the page, This results include information of body,location,owner,image, of the shout as well as time, count and status which were made on the fly.

```
app.get("/shouts/:id", function(req,res){

    db.Shout.findAll({
        include : [{
            model : db.User
        }],
        order: [
            ['updatedAt', 'DESC']
        ]
    }).then(function(dbShout){
        for (var i = 0; i < dbShout.length; i++) {
            dbShout[i].time = moment(dbShout[i].updatedAt).fromNow();
            dbShout[i].count = dbShout[i].Users.length;
            for (var j = 0; j < dbShout[i].Users.length; j++) {
                if (dbShout[i].Users[j].id === parseInt(req.params.id)) {
                    dbShout[i].status = true;
                } else {
                    dbShout[i].status = false;
                }
            }
        }
        res.render("map" , {allShouts : dbShout});
    });
});

```
This block of code finds all of the shouts including the information realted to the users who are part of those shouts, in the Descenging order of the time that they got updated.
It, then, returns the results in the json format

```
app.get("/api/shouts", function(req,res){

    db.Shout.findAll({
        include : [{
            model : db.User
        }],
        order: [
            ['updatedAt', 'DESC']
        ]
    }).then(function(dbShout){
        res.json(dbShout);
    });
});
```

This block of the code, is the server route side to create the a new shout.
- It first create a new shout in the Shout table of the database with the information gattered from the body of client page request including body,owner of the shout, location and image
- It then creates a new row in the table UserShout which is the table of relationship between the shouts and users
- And, finally, returns the results as jason object

```
app.post("/shouts", function(req, res){
    
    db.Shout.create({
        body : req.body.body,
        owner: req.body.owner,
        location: req.body.location,
        image: req.body.image,

    }).then(function(dbShout){

        db.UserShout.create({
            UserId : req.body.UserId,
            ShoutId : dbShout.dataValues.id
        }).then(function(pair){
            res.json(dbShout); 
        });
    });          
});
```

This block of the code adds a new user id to a specific shout id, this happens when a new user wants to join a shout
- For this purpose, a new row should be added to the UserShout table which is the table for the many to many relationship.
- It then returns the results as the json object
```
app.post("/shouts/:shoutId/:userId", function(req, res){

    db.UserShout.create({
        UserId : req.params.userId,
        ShoutId : req.params.shoutId
    }).then(function(pair){
        res.json(pair); 
    });          
});
```
This block of the code is the route to update a specific shout. 
```
app.put("/shouts/:id" , function(req,res){
    db.Shout.update(
        req.body,  
        {where : {
            id : req.params.id
        }
    }).then(function(dbShout){
        res.json(dbShout);
    });
});
```
This block of the code is the server side route to delete a specific shout with the id provided in url
```
app.delete("/shouts/:id" , function(req,res){
    db.Shout.destroy({
        where : {
            id : req.params.id
        }
    }).then(function(dbShout){
        res.json(dbShout);
    });
});
```

This block of the code finds all the users; and include the info of the shouts they own.
It then returns the reuslts as json object
```
app.get("/api/users", function(req,res){
    db.User.findAll({
        include : [{
        model : db.Shout
        }]

    }).then(function(dbUser){
        res.json(dbUser);
    });
});
```

This block of the code, gets the information of a specific user along with the information of all the shouts that the user owns.
It, then, return the results as a json object
```

app.get("/api/users/:id", function(req,res){
    db.User.findOne({
        where : {
        id : req.params.id
        },
        include: [db.Shout]
    }).then(function(dbUser){
        res.json(dbUser);
    });
});
```
This block of the code is the server side route to create a new user based on the body of the request that is made in the client side
```
  app.post("/api/users/",function(req,res){
    db.User.create(req.body).then(function(dbUser){
      res.json(dbUser);
    });
  });
```

**handlebars:**

Welcome Page handlebar:
```
<div class="jumbotron-container " id="jumbotron-hp">
    <h1 class="display-2 title bouncing">SHOUT</h1>
    <hr>
    <p class="lead rubberband text-center">Scroll down</p>
</div>

<div id="parallax"></div>

<button class="btn btn-primary bouncing" id="start">Let's Shout!</button>
<div id="goog" class="g-signin2" data-onsuccess="onSignIn"></div>
```

* Shouts page handlebar
This part is a small peices showing how the shout appears on the page: it will include the information about the body of the shout, the owner and its time of update from now.
All these information are available in the allShouts object that server sends to the page upon hitting a specific route of /shouts/:id

The code also shows how the Join button will appear on the page depending on the status of the each shout in the allShouts object
```
{{#each allShouts}}
    <div class="alert alert-primary hvr-bounce-in" style="width: 100%" role="alert">
        <div class="row">
            <div class="col-md-8">
                <h5>{{this.body}}</h5>
                By: {{this.owner}}
                <br> {{this.time}}
                <br>

                <button class="btn btn-primary" id="{{this.count}}">{{this.count}} shouters joined.</button>
                {{#unless this.status}}
                <button class="btn btn-success join-btn hvr-bounce-in" data-id="{{this.id}}" data-body="{{this.body}}" data-count={{this.count}} data-stat={{this.status}}>
                    Join
                </button>
                {{/unless}} 
            </div>
            <div class="col-md-4">
                <img class="cardImage rounded float-right" src={{this.image}}>
            </div>
        </div>
    </div>
{{/each}}
```
* Users page handlebar

This block of the handlebar shows how the shouts are rendered in the profile page:
- first, the name is taken from the name key of the all object which is sent to the handlebar by server upon hitting a specific route of /users/:id
- It also, goes through all the shouts in the "all" object, and for each of them checks whether the value of isOwner is true or false:
- - if the current user is the owner of the shout, it creates an input field with the placeholder of shout's body , and update and delete buttons
- - if not, it only shows the body of the shout without the rights to delete or update them.
```
<h5 class="card-title" ><div id="name-tag">{{all.name}}</div><br>Here are your shouts!</h5>
{{#each all.Shouts}} 
    <div class="uk-animation-toggle uk-animation-scale-up uk-transform-origin-bottom-center">
        <div class="alert alert-primary " role="alert">

            {{#if this.isOwner}}           
            <input class="updateShout{{this.id}}" data-id="{{this.id}}" type="text" style="width: 100%" name="firstname" placeholder="{{this.body}}"><br>
            <br>                
            By: {{this.owner}}
            <br>                
            {{this.time}}
            <br>

            <button  class="btn btn-success update-btn" data-id="{{this.id}}" >Update</button>
            <button class="btn btn-success del-btn" data-id="{{this.id}}">Del</button>
            {{else}}
                    {{this.body}}
                    <br>
                    By: {{this.owner}}
                    <br>
                    {{this.time}}
            {{/if}}
        </div>
    </div>
{{/each}}  
```

### [Andrew](https://github.com/atton88)  

- Google Authentication
- helping to style the pages

#### Some Code Snippets

This block of code shows what happens during google sign in authentication. 
- It first clears the local storage
- Then signs the user into google, creates user if not in database, stores local variables
- It getts the profile information from google
- stores the information on local storage to be able to check later on whether the user has already signed in or not
- Then, it makes a get call to the users api to get the list of all users
- -  and finds out wether the user's email already exists in the database of our currently signed in users
- - If yes, that means the user already exists: ==> gets the id of the user and update the id in the local storage to that id, and ends the authentication process, and redirects the window to the shouts/userId page
- - If not, creates a new user with the info collected from google profile of the user, and makes an ajax call to the api/users to add the user to the list of currently signed in users. Sets the id of the user to the local stroage, and ends the authentication process, and redirects the window to the shouts/userId page.

```

function onSignIn(googleUser) {
    localStorage.clear();
    var profile = googleUser.getBasicProfile();

    localStorage.setItem("name", profile.getName());
    localStorage.setItem("email", profile.getEmail());
    localStorage.setItem("imgUrl", profile.getImageUrl());


    var email = localStorage.getItem("email");
    $.get("/api/users/", function(results){
        var found = false;
        for (var i = 0; i < results.length; i++){
            if (results[i].email === email) {
                found = true;
                userInfo.id = results[i].id;
                localStorage.setItem("id", results[i].id);
                gapi.auth2.getAuthInstance().signOut();
                window.location.href = "/shouts/" + userInfo.id;
            }
        }
        if (!found) {
            var newUser = {
                name: localStorage.getItem("name"), 
                email: localStorage.getItem("email"), 
                imgUrl: localStorage.getItem("imgUrl"), 
            };
        $.post("api/users", newUser, function(data) {
            localStorage.setItem("id", data.id);
            gapi.auth2.getAuthInstance().signOut();
            window.location.href = "/shouts/" + data.id;
        });
    }
});
```



### [Nasib](https://github.com/NasibNia)



- building the general modular scheme of the app
- Sequelize database models and management
 - - including index.js , shout.js , user.js , and userShout.js
- handlebars management
- Design of the website
    - - javascript codes for the dynamic feature of pages styles
    - - creating css formats and using other css libraries
    - - creating the gif for the welcome page through Animaker online application

##### Some Code Snippets

* server.js

This code is the code which is called by node to create the server and runs the app. The list of dependencies and creation of server happens here:

```
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/shout-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
```

* models and database:
1.index.js

The following block of the code shwos the index.js model which creates the backbone of our database
 ```
'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
 ```
2.shouts.js
This block of the code shows the sequelize model for the Shouts table
It also shows that each Shout belongs to many User. User model is defined in a different file with the name user.js in the same directory of models.
```
module.exports = function(sequelize , DataTypes){
    var Shout = sequelize.define("Shout" , {
        body:{
            type: DataTypes.TEXT,
            allowNull : false,
            len:{
                args : [0,200],
                msg : 'text is too long'
                }
        },
        location : DataTypes.STRING,
        owner: DataTypes.STRING,
        image : DataTypes.STRING,
    });

    Shout.associate = function(models){
        Shout.belongsToMany(models.User, {through: {model : models.UserShout}});
    };
    return Shout;
};
```

3.user.js:

This block of the code shows the sequelize model for the Users table
It also shows that each User belongs to many Shouts. Shouts model is defined in a different file with the name shout.js in the same directory of models.
```
module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User",{
        name : {
            type: DataTypes.STRING
        },
        email: {
            type : DataTypes.STRING
        },
        imgUrl : DataTypes.STRING,
    });

    User.associate = (models) => {
        User.belongsToMany(models.Shout, {through : {model: models.UserShout}});
    };
    return User;
};

```
4.userShout.js:

This block of the code shows the sequelize model for the many to many association of user ids and shout ids.

```
module.exports = function(sequelize, DataTypes){
    var UserShout = sequelize.define("UserShout",{});
    return UserShout;
};

```

* java script codes for the dynamic effects on the pages:

This function randomly choses two colors from an array of colors which is previously provided in the page, and in the intervals of 10 mili seconds creates a linear gradient css effects from one color to another.


```
 //applying the gradient to the color array
  function updateGradient()
  {
    
  if ( $===undefined ) return;
    
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#gradient').css({
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  setInterval(updateGradient,10);
```
This function creates a blinking effect by useing the jquery functions of fadeIn and fadeOUt for different classes of html divs in the intervals of every 1 seconds.
```
function blinker() {
    $('.blinking1').fadeOut(750);
    $('.blinking1').fadeIn(750);

    $('.blinking2').fadeOut(1000);
    $('.blinking2').fadeIn(1000);
  }
  setInterval(blinker, 1000);
```

### [Muhammad](https://github.com/mawais54013)

I worked on the Google Maps API by displaying the map to the page and getting the user's Geolocation to use and display the content. Google API allows use to get the real time location of the user while also displaying information which in this case a Shout as the content of a marker. 

```
<div class="card" style="width: 18rem; display:none">
    <div class="card-body">
        <h5 class="card-title">All Shouts</h5>
        <div id="userPut">
            {{#each allShouts}}
            <div class="alert alert-primary" role="alert">
                <div>|</div>
                {{this.body}}
            </div>
            {{/each}}
        </div>
    </div>
</div>
```
The code above is used to grab the content from the user input and store it in to a marker. The issue happened that I could not grab the content from the main All Shouts area because then I was getting every single information that I did not need. So this div is useful to seperate the content from the other information and then use a split to organize it and lastly add it to the marker. 

```
navigator.geolocation.getCurrentPosition(function (position) {
    pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
        
    var icon = {
        url: '../assets/images/marker2.png',
        scaledSize: new google.maps.Size(80, 80),
    };

    marker = new google.maps.Marker({
        map: map,
        icon: icon,
        position: { lat: pos.lat, lng: pos.lng },
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent(b[b.length - 1]);
            infowindow.open(map, marker);
        }
    })(marker, i));
    setTimeout(function () {
        marker.setMap(null);
        delete marker;

    }, 3600000);
    return marker;
});   
```
The code above shows that from navigator, the user current location is selected with the lat and lng. The a marker is created that will be displayed on map with a icon on that position. Additionally, I included a listener to the marker so that when the marker is clicked then a function will be run that displays the content taken from the user input. Lastly, every marker includes a timeout period which in this case is 1 hour. The marker will appear on the map for that period and then disappear until the user can make another shout. 

## Authors
* **Nasib** - https://github.com/NasibNia
* **Andrew** - https://github.com/atton88
* **Muhammad** - https://github.com/mawais54013

## Acknowledgments

* UCB Extension Coding Bootcamp 