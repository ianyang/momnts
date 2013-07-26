"use strict";

google.maps.visualRefresh = true;
var map;
var initialLocation;
var browserSupportFlag =  new Boolean();
var sf = new google.maps.LatLng(37.7750, -122.4183);
var infowindow;
var marker;

function initialize() {
  var myOptions = {
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), myOptions);

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      initialLocation = sf;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in San Francisco.");
      initialLocation = sf;
    }
    map.setCenter(initialLocation);
  }
}

function createMarker(place) {

  var placeLoc = place.geometry.location;

  marker = new google.maps.Marker({
    map: map,
    position: placeLoc,
    animation: google.maps.Animation.DROP
  });

  infowindow = new google.maps.InfoWindow(
    { content: place.name,
    });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, this);
    calcRoute(generalAssembly, placeLoc);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

function choose(event) {
  event.preventDefault();

  var $this = $(this);
  $('.show_events').empty();
  $('.show_events').append($this);

  $($this).css('border','5px solid rgba(22,160,133,1)');

  var id = "events/"+$($('.show_events .hidden .eventid')).text();
  $('.show_attend form').attr("action", id);

}

$('body').on('click', '.event', choose);






// $(function() {
// "use strict";

//   $(function(map) {

//     var map = L.map('map').setView(currentlocate, 13);

//     L.tileLayer('http://{s}.tile.cloudmade.com/a88229bf8d864c4eab186d0cfa1f5349/997/256/{z}/{x}/{y}.png', {
//         attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
//         maxZoom: 18
//     }).addTo(map);

//     for (var i = 0; i < $(".hidden").length; i++) {

//       var lat = $($('.hidden .lat')[i]).text();
//       var lon = $($('.hidden .long')[i]).text();
//       var top = $($('.hidden .tol')[i]).text();

//       var geolocate = new Array();
//       geolocate[0] = parseFloat(lat);
//       geolocate[1] = parseFloat(lon);

//       L.marker(geolocate).addTo(map)
//       .bindPopup(top)
//       .openPopup();

//     };


//   });

