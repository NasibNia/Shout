# Shout

This fun application is an easy way of putting events on the map in real time through the crowdsource. And that's right; we named it Shout; to shout the events around you and invite others to join the crowd. Whether there is an accident near by or a free concert happening couple blocks down, the user can shout this experience to have it be seen by everyone.  

![index](public/assets/images/Screen1.png)

![main](public/assets/images/Screen2.png)

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

* [UIkit](https://getuikit.com/)

    Cool CSS Library we used to organize everything and assist in the animation. 

* [Animaker](https://www.animaker.com/)

    Useful website for making animations and then we used Screencast to turn them to gifs for the opening page of the website. 

## Our Process

**WireFrame**
The very initial wireframe looked like this 

![design](public/assets/images/Screen3.jpg)

And as the code evolved turned into three different pages; welcome page, main page , and profile page, each of which are created through handlebars. The server listens for the request made by the client side, does the set of appropriate actions and renders the responses back to the page through handlebars.


**Tasks:** 
Here is the rough scheme of our contributions to the project:

### [Nasib](https://github.com/NasibNia) & [Andrew](https://github.com/atton88)  

We spent a considerable amount of time together as pair programmers, to build the features and fix the bugs on both client and the server side.

- Front end javascript codes:
- Server side javascript codes:
- maintenance of deployment issues to heroku



### [Andrew](https://github.com/atton88)  

- Google Authentication
- helping to style pages

### [Nasib](https://github.com/NasibNia)

- building the general modular scheme of the app
- Sequelize database models and management
- handlebars management
- Design of the website
    - - javascript codes for the dynamic feature styles of the page
    - - css libraries
    - - creating a gif for the welcome page


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