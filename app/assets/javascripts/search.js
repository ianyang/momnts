$(document).ready(function(){
  "use strict";

  var lat;
  var lng;

  var time = $('.time').text();
  var clientDay = moment(time).format("dddd");
  $('.time').html(clientDay).fadeIn();

  function events() {
    $.ajax({
      url: "/all_events",
      method: "get",
      dataType: "json",
      data: {"lat": lat, "lng": lng},
      success: function(data) {
        var today = data[0];
        var tomorrow = data[1];

        $.each(today, function(x) {
          $('.today-container').append("<div class='event'>"
            + "<div class='time-container'>"
              + "<div class='time'>" + moment(today[x]["time"]).format("hh:mm") + "</div>"
            + "</div><div class='location-container'>"
              + "<div class='location'><img src='" + today[x]["image"] + "' ></div>"
              + "<p>" + today[x]["location"] + "</p>"
            + "</div><div class='duration-container'>"
              + "<div class='duration'>" + today[x]["duration"] + "m</div>"
            + "</div><div class='topic-container'>"
              + "We can talk about " + today[x]["topic"].toLowerCase()
            + "</div><p class='id hidden'>" + today[x]["id"] + "</p></div>");
        });

        $.each(tomorrow, function(x) {
          $('.tomorrow-container').append("<div class='event'>"
            + "<div class='time-container'>"
              + "<div class='time'>" + moment(tomorrow[x]["time"]).format("hh:mm") + "</div>"
            + "</div><div class='location-container'>"
              + "<div class='location'><img src='" + tomorrow[x]["image"] + "' ></div>"
              + "<p>" + tomorrow[x]["location"] + "</p>"
            + "</div><div class='duration-container'>"
              + "<div class='duration'>" + tomorrow[x]["duration"] + "m</div>"
            + "</div><div class='topic-container'>"
              + "We can talk about " + tomorrow[x]["topic"].toLowerCase()
            + "</div><p class='id hidden'>" + tomorrow[x]["id"] + "</p></div>");
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

  $('body').delegate('.event','click', function(){
    var $this = $(this);
    $('.results').hide();
    $('.results').empty();
    $('.results').append($this);
    $('.results').fadeIn();
    $('#id').val($('.id').text());
    $('.acceptance-container').fadeIn();
  });

});
