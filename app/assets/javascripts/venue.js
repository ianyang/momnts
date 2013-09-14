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
            + "<div class='image'><img src='" + data[x]["image_url"] + "' /></div>"
            + "<div class='info'><h3>" + data[x]["name"] + "</h3>"
            + "<p class='address'>" + data[x]["location"]["address"] + "</p>"
            + "<p class='neighborhood'>" + data[x]["location"]["neighborhoods"] + "</p></div>"
            + '</div>');
        });
        $('.loading').css('display','none');
      }
    });
  };

  $('.results').empty();

  var searchFind = 'lunch';
  var searchPlace = 'san francisco';
  yelp();

  $('.venue form').on("submit", function(event) {
    event.preventDefault();
  });

  $('.search-icon').click(function(event) {
    event.preventDefault();

    $('.results').empty();
    $('.loading').css('display','block');

    searchFind = $('#find').val();
    searchPlace = $('#place').val();
    yelp();

  });

  function choose() {

    var $this = $(this);
    $('.results').empty();
    $('.results').append('<h3>You are going to<h3>');
    $('.results').append($this);
    $('.results').css('text-align','center');
    $('.venue-container').css('margin-left','25%');

    $('#event_address').val($('.address').text()+', '+$('.neighborhood').text());
    $('#event_location').val($('.info h3').text());
    $('#event_image').val($('.image img')[0].src);
  };

  $('body').on('click', '.venue-container', choose);

});