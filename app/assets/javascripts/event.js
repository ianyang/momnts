$(function() {
"use strict";

  $(function(map) {

    var map = L.map('map').setView(currentlocate, 13);

    L.tileLayer('http://{s}.tile.cloudmade.com/a88229bf8d864c4eab186d0cfa1f5349/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);

    for (var i = 0; i < $(".hidden").length; i++) {

      var lat = $($('.hidden .lat')[i]).text();
      var lon = $($('.hidden .long')[i]).text();
      var top = $($('.hidden .tol')[i]).text();

      var geolocate = new Array();
      geolocate[0] = parseFloat(lat);
      geolocate[1] = parseFloat(lon);

      L.marker(geolocate).addTo(map)
      .bindPopup(top)
      .openPopup();

    };


  });

  function choose(event) {
      event.preventDefault();

      var $this = $(this);
      $('.show_events').empty();
      $('.show_events').append('<h2>You have chosen<h2>');
      $('.show_events').append($this);
      $('.show_events').append("<span class='re_search'><a href='/attend'><button>Search Again</button></a></span>");

      $($this).css('border','5px solid rgba(22,160,133,1)');

      var id = "events/"+$($('.show_events .hidden .eventid')).text();
      $('.show_attend form').attr("action", id);

  }

  $('body').on('click', '.event', choose);

});