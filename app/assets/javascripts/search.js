$(function(){
  "use strict";

  $(function(initializeMap) {

    var map = L.mapbox.map('map', 'ianyang.map-6tabzcd8').setView([37.7750,-122.4183],10);

    map.addLayer(L.mapbox.tileLayer('ianyang.map-6tabzcd8', {
      detectRetina: true,
      retinaVersion: 'ianyang.map-6tabzcd8'
    }));

    map.locate({setView:true, maxZoom:14});
    map.dragging.disable();

    if (!navigator.geolocation) {
      alert('geolocation is not available');
    } else {
      map.locate();
    }

    map.on('locationfound', function(e) {
      map.fitBounds(e.bounds);

      map.markerLayer.setGeoJSON({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
          'marker-color': '#000',
          'marker-symbol': 'star-stroked'
        }
      });
    });

    map.on('locationerror', function() {
      alert('position could not be found');
    });

  });

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
