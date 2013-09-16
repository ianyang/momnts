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
          $('.today-container').append("<div class='event'>"
            + "<div class='time-container'>"
              + "<div class='time'>" + moment(data[x]["time"]).format("hh:mm") + "</div>"
            + "</div><div class='location-container'>"
              + "<div class='location'><img src='" + data[x]["image"] + "' ></div>"
              + "<p>" + data[x]["location"] + "</p>"
            + "</div><div class='duration-container'>"
              + "<div class='duration'>" + data[x]["duration"] + "m</div>"
            + "</div><div class='topic-container'>"
              + "We can talk about " + data[x]["topic"].toLowerCase()
            + "</div></div>");
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
