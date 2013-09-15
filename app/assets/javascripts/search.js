$(document).ready(function(){
  "use strict";

  var lat;
  var lng;

  function events() {
    $.ajax({
      url: "/all_events",
      method: "get",
      dataType: "json",
      data: {"lat": lat, "lng": lng},
      success: function(data) {
        $.each(data, function(x) {
          $('.today-container .result').append(data[x]);
          console.log(data[x]);
        });
        $('.loading').css('display','none');
        $('.today-container').fadeIn();
        $('.tomorrow-container').fadeIn();
      }
    });
  }

  if (!navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      events();
    });
  } else {
    lat = '37.7750';
    lng = '-122.4183';
    events();
  }


});
