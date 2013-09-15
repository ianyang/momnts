$(function() {
  "use strict";

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
    $('.results').fadeIn();

    $('#event_address').val($('.address').text()+', '+$('.city').text()+', '+$('.postcode').text());
    $('#event_location').val($('.heading').text());
    $('#event_image').val($('.image img')[0].src);

    $('.create.confirm').fadeIn();
  };

  $('body').on('click', '.venue', choose);

});