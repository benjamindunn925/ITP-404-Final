var app = angular.module('maps', ['ngRoute', ]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/search.html',
            controller: 'searchController',
            controllerAs: 'vm'
        })
        .when('/search', {
            templateUrl: 'templates/search.html',
            controller: 'searchController',
            controllerAs: 'vm'
        })
        .when('/search/:searchTerm', {
            templateUrl: 'templates/results.html',
            controller: 'venueListController',
            controllerAs: 'vm'
        })
});

app.controller('searchController', function(mapsFactory, $location){
    var vm = this;
    vm.searchTerm = "";
    vm.venueSearch = function() {
        console.log('searching...', vm.searchTerm);

        mapsFactory.venueSearch(vm.searchTerm).then(function (venues) {
            vm.venues = venues;
            console.log(venues);
            var url = vm.searchTerm;
            var route = "/search/" + url;
            $location.url(route);
        });

    };


});

app.controller('venueListController', function(mapsFactory, $routeParams, $location){
    var vm = this;
    vm.searchTerm = $routeParams.searchTerm;
    mapsFactory.venueSearch(vm.searchTerm).then(function(venues){
        vm.venuesList = venues;
        console.log(venues);
        var url = vm.searchTerm;
        var route = "/search/" + url;
        $location.url(route);
    });

    vm.display = function(data){
        if (infoWindowHolder.length > 0){
            infoWindowHolder[0].close();
        }
        var infoWindow = new google.maps.InfoWindow({
            map: map,
            position: {lat: parseFloat(data.location.lat), lng: parseFloat(data.location.lng)},
            content: "<div style='color: #000000;'>" + data.name + "</div>"
        });
        infoWindowHolder[0] = infoWindow;
    };

    vm.getDirections = function(data){
        console.log(pos);
        if(pos){
            var end = data.location.lat + " " + data.location.lng;
            var start = pos.lat + " " + pos.lng;
            directionsService.route({
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setPanel(document.getElementById('directions'));

                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
        else{
            window.alert("Please wait, determining location");
        }
    };

    vm.goBack = function(){
        console.log("click");
        slideOut();
        if (infoWindowHolder.length > 0){
            infoWindowHolder[0].close();
        }
        $location.url("/search/");
        directionsDisplay.setMap(null);
        directionsDisplay.set('directions', null);
        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsService = new google.maps.DirectionsService;
        directionsDisplay.setMap(map);

    };
});




app.factory('mapsFactory', function($http){
    return{
        venueSearch: function(venue){
            //pos = getLocation();
            //waitForElement(pos);
            var url = "https://api.foursquare.com/v2/venues/search?client_id=JUEUSZOK0CAIBJRCYYD1CIKI1ZQKF0VLSYRUZO2B4LSBVE31&client_secret=QGVRM02UD2FZNQB3BMBIG5HRUCQIWHTY2NOKHV3EE2ALUFEG&v=20140806&m=foursquare&near="+ pos.lat + " " + pos.lng +"&query=" + venue + "&callback=JSON_CALLBACK";
            return $http.jsonp(url)
                .then(function(response) {
                    console.log(response.data.response);
                    return response.data.response.venues;
                });
        }
    }
});