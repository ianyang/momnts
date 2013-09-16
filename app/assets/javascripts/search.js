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
        if (today !== null && today.length > 0) {
          $('.today-container .event').remove();
          $.each(today, function(x) {
            $('.today-container').append("<div class='event'>"
              + "<div class='heading'>"
                + "<div class='name'>" + today[x]["location"] + "</div>"
                + "<div class='address'>" + today[x]["address"].substring(0, today[x]["address"].indexOf(",")) + "</div>"
              + "</div><div class='time-container'>"
                + "<div class='time'>" + moment(today[x]["time"]).format("hh:mm") + "</div>"
              + "</div><div class='location-container'>"
                + "<div class='location'><img src='" + today[x]["image"] + "' >"
                + "<div class='distance'>" + today[x]["distance"] + "mi</div></div>"
              + "</div><div class='duration-container'>"
                + "<div class='duration'>" + today[x]["duration"] + "m</div>"
              + "</div><div class='topic-container'>"
                + "We can talk about " + today[x]["topic"].toLowerCase().replace('<script>', "")
              + "</div><p class='id hidden'>" + today[x]["id"] + "</p></div>");
          });
        }

        if (tomorrow !== null && today.length > 0) {
          $('.tomorrow-container .event').remove();
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
                + "We can talk about " + tomorrow[x]["topic"].toLowerCase().replace('<script>', "")
              + "</div><p class='id hidden'>" + tomorrow[x]["id"] + "</p></div>");
          });
        }

        $('.loading').css('display','none');
        $('.today-container').fadeIn();
        $('.tomorrow-container').fadeIn();
      }
    });
  }

  if (!navigator.geolocation) {
    lat = '37.7750';
    lng = '-122.4183';
    events();
  } else {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      events();
    });
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
