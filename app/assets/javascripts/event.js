"use strict";

// visuals

$('#events-sidebar .buttons button:nth-child(1)').click(function(event){
  event.preventDefault();
  $('#find').fadeIn();
  $('#create').css('display', 'none');
  $(this).css({'background':'rgba(250,250,250,0.7)', 'color':'rgba(60,60,60,1)'});
  $('#events-sidebar .buttons button:nth-child(2)').css('background','rgba(250,250,250,0)')
})

$('#events-sidebar .buttons button:nth-child(2)').click(function(event){
  event.preventDefault();
  $('#find').css('display','none');
  $('#create').fadeIn();
  $(this).css({'background':'rgba(250,250,250,0.7)', 'color':'rgba(60,60,60,1)'});
  $('#events-sidebar .buttons button:nth-child(1)').css('background','rgba(250,250,250,0)')
})


//mapbox

$(function(initializeMap) {

  var map = L.mapbox.map('map', 'ianyang.map-6tabzcd8').setView([37.7750,-122.4183],10);
  map.locate({setView:true, maxZoom:14});
  map.dragging.disable();



});




// function searchEvent() {
//     $.ajax(
//     '/all_events',
//     { success: function (data) {

//       data for each

//     }
//     }
//   )
// });
// }






















// Gmaps


// google.maps.visualRefresh = true;
// var map;
// var initialLocation;
// var browserSupportFlag =  new Boolean();
// var sf = new google.maps.LatLng(37.7750, -122.4183);
// var infowindow;
// var marker;

// function initialize() {
//   var myOptions = {
//     zoom: 13,
//     mapTypeControl: false,
//     panControl: false,
//     zoomControl: true,
//     zoomControlOptions: {
//       style: google.maps.ZoomControlStyle.SMALL,
//       position: google.maps.ControlPosition.LEFT_BOTTOM
//     },
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//   var map = new google.maps.Map(document.getElementById("map"), myOptions);

//   // Try W3C Geolocation (Preferred)
//   if(navigator.geolocation) {
//     browserSupportFlag = true;
//     navigator.geolocation.getCurrentPosition(function(position) {
//       initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//       map.setCenter(initialLocation);
//     }, function() {
//       handleNoGeolocation(browserSupportFlag);
//     });
//   }
//   // Browser doesn't support Geolocation
//   else {
//     browserSupportFlag = false;
//     handleNoGeolocation(browserSupportFlag);
//   }

//   function handleNoGeolocation(errorFlag) {
//     if (errorFlag == true) {
//       alert("Geolocation service failed.");
//       initialLocation = sf;
//     } else {
//       alert("Your browser doesn't support geolocation. We've placed you in San Francisco.");
//       initialLocation = sf;
//     }
//     map.setCenter(initialLocation);
//   }

//     var myLatlng = new google.maps.LatLng(37.7750,-122.4183);

//     var marker = new google.maps.Marker({
//         position: myLatlng,
//         map: map,
//         title: 'Hello World!',
//         animation: google.maps.Animation.DROP
//     });

// }

// function createMarker(lat,lon) {

//   var placeLoc = new google.maps.LatLng(lat,lon);

//   var marker = new google.maps.Marker({
//       position: placeLoc,
//       map: map,
//       title: 'Hello World!',
//       animation: google.maps.Animation.DROP
//   });

//   // infowindow = new google.maps.InfoWindow(
//   //   { content: topic,
//   //   });

//   // google.maps.event.addListener(marker, 'click', function() {
//   //   infowindow.open(map, this);
//   // });
// }

// google.maps.event.addDomListener(window, 'load', initialize);

// function choose(event) {
//   event.preventDefault();

//   var $this = $(this);
//   $('.show_events').empty();
//   $('.show_events').append($this);

//   $($this).css('border','5px solid rgba(22,160,133,1)');

//   var id = "events/"+$($('.show_events .hidden .eventid')).text();
//   $('.show_attend form').attr("action", id);

// }

// $('body').on('click', '.event', choose);


  // var map = L.map('map').setView([37.7750,-122.4183], 13);

  // L.tileLayer('http://{s}.tile.cloudmade.com/a88229bf8d864c4eab186d0cfa1f5349/997/256/{z}/{x}/{y}.png', {
  //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  //     maxZoom: 18
  // }).addTo(map);

  // for (var i = 0; i < $(".hidden").length; i++) {

  //   var lat = $($('.hidden .lat')[i]).text();
  //   var lon = $($('.hidden .long')[i]).text();
  //   var top = $($('.hidden .tol')[i]).text();

  //   var geolocate = new Array();
  //   geolocate[0] = parseFloat(lat);
  //   geolocate[1] = parseFloat(lon);

  //   L.marker(geolocate).addTo(map)
  //   .bindPopup(top)
  //   .openPopup();

  // };
