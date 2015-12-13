var pos;

function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position){
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

        });
    }
    console.log("location: " + pos);
    return pos;
}


window.onload = getLocation();
window.onload = $("#greeting").fadeIn(1000);

function waitForElement(){

    if(typeof pos !== "undefined") {
        console.log("blah blah");
    }
    else{
        setTimeout(function(){
            waitForElement();
        },250);
    }
}

function MainController($scope) {
    $scope.toggle = true;
}

function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}


var progress = setInterval(function () {
    var $bar = $('.progress-bar');

    if ($bar.width() >= 400) {
        clearInterval(progress);
        $("#enter").fadeIn(1500);
        $("#greeting").fadeTo(1000, 0);
    } else {
        $bar.width($bar.width() + 80);
    }
    $bar.text($bar.width() / 4 + "%");
}, 1000);


function slideIn(){
    console.log("click");
    $("#directions").addClass("opened");
    $("#container").addClass("opened");

}

function slideOut(){
    $("#directions").removeClass("opened");
    $("#container").removeClass("opened");
}
 function removeDirections(){
     directionsDisplay.set('directions', null);
 }