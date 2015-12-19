<h3>Final Project- ITP-404 (Modern Technologies of Web Development)</h3>
<p>Assignment: Create a web application using an API, Google Maps integration, AngularJS, AJAX and other JavaScript components</p>

<h4>LOGIC:</h4>
<p>This application takes in a user's search term and location, passes them into a JSON request and displays a list of responses that the user can click on to display on a map or get directions to.</p>

<h4>USAGE:</h4>
<p>The website gets the user's location by Geolocation and creates a new Google Map based off of this location. The user can then search for restaurants, attractions or other points of interest. A search will append the search term to the end of the URL. The search term and the user's location are passed through the FourSquare API and return a JSON response with a list of locations/venues related to the user's query. This list is displayed on the website and the user can click on any item to display it on the Google Map. The user can also request directions, which will open a panel with directions from Google Maps and overlay a route on the map. If the user wants to perform another search, there is a back button that will reset the search term and display the search box once more. All of this occurs on one page by using AngularJS routes and templates.</p>
