# com-spot-fathom
gps rewrite in node

<h2>Requirements: </h2>
-Sign in and registration of users<br>
-Approved users to create and share locations with friends<br>
-Identify heading and distance between two points<br>
-Mapping of a location<br>
-Weather for a location<br>

<h3>Requirement Changes:</h3><br>
-ADDED 9/24/2021 by Charles Berray<br>
-ability to add/see/change/delete photo of location<br>

<h2>Application Build:</h2>

<h3>Phase 1</h3>
-Node JS build<br>
-Start with server (express, nodemon, .env, postman)<br>
-Add routes<br>
-Add mongo (use mongoose)<br>
-Build basic crud<br>
-Add logger, parser, CORS<br>
-Improve crud responses<br>
-Add crud validation<br>

<h3>Phase 2</h3>
-Add database join (a location joins to userid)<br>
-Revalidate CRUD<br>

<h3>Phase 3</h3>
-acquire api key for google maps<br>
-build html, css, js for google map display<br>



<h3>Phase 4</h3>
-update user, users with added fields<br>
-evaluate, and potentially incorporate login fields<br>
-build class for heading and direction between two points<br>
-ADDED - create schema and crud for photo with join to locationid
<hr>
PROGRESS TO HERE THUS FAR<br>
<hr>
-build routers for GET requests<br>
-  list of friends<br>
-  list of locations<br>

<h3>Phase 5</h3>
-build login html, css<br>
-build user html, css<br>
-build my locations html, css<br>

<h3>Phase 6</h3>
-connect html to app.js<br>
-connect location GET to map<br>
-embed map in location html<br>

<h3>Phase 7</h3>
-add further event listeners<br>
-  login to user info<br>
-  login to new user setup<br>
-  user to all locations and back<br>
-  login to all locations<br>
-  all locations to single location<br>
