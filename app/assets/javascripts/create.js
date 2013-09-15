$(function() {
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
          'marker-color': '#f1c40f',
          'marker-symbol': 'star-stroked'
        }
      });
    });

    map.on('locationerror', function() {
      alert('position could not be found');
    });

  });

  function yelp() {
    $.ajax({
      url: "/search",
      method: "get",
      dataType: "json",
      data: {"find": searchFind, "place": searchPlace},
      success: function(data) {
        $.each(data, function(x) {
          $('.results').append('<div class="venue">'
            + "<div class='heading'>" + data[x]["name"] + "</div>"
            + "<div class='image'><img src='" + data[x]["image_url"] + "' /></div>"
            + "<div class='info'><p class='address'>" + data[x]["location"]["address"] + "</p>"
            + "<p class='city'>" + data[x]["location"]["city"] + "</p>"
            + "<p class='postcode'>" + data[x]["location"]["postal_code"] + "</p>"
            + "<img src='" + data[x]["rating_img_url_large"] + "'>"
            + "</div></div>"
            );
        });
        $('.loading').css('display','none');
      }
    });
  };

  $('.results').empty();

  var searchFind = 'lunch';
  var searchPlace;

  navigator.geolocation.getCurrentPosition(function(position) {
    searchPlace = position.coords.latitude + ',' + position.coords.longitude;
    yelp();
  });

  $('.search-bar form').submit(function(){
    event.preventDefault();

    $('.results').empty();
    $('.loading').css('display','block');

    searchFind = $('#find').val();

    navigator.geolocation.getCurrentPosition(function(position) {
      searchPlace = position.coords.latitude + ',' + position.coords.longitude;
      yelp();
    });

  });

  $('#find').focus(function(){
    $(this).val('');
  });

  $('#find').change(function(event) {
    event.preventDefault();

    $('.results').empty();
    $('.loading').css('display','block');

    searchFind = $('#find').val();

    navigator.geolocation.getCurrentPosition(function(position) {
      searchPlace = position.coords.latitude + ',' + position.coords.longitude;
      yelp();
    });

  });

  function choose() {
    var $this = $(this);
    $('.results').hide();
    $('.results').empty();
    $('.results').append($this);
    $this.css('border','1px solid #f1c40f');
    $('.results').fadeIn();

    $('#event_address').val($('.address').text()+', '+$('.city').text()+', '+$('.postcode').text());
    $('#event_location').val($('.heading').text());
    $('#event_image').val($('.image img')[0].src);

    $('.create.confirm').fadeIn();
  }

  $('body').on('click', '.venue', choose);

});