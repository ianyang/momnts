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
          $('.results').append('<div class="venue-container">'
            + "<div class='image'><img src='" + data[x]["image_url"] + "' /></div>"
            + "<div class='info'><h3>" + data[x]["name"] + "</h3>"
            + "<p>" + data[x]["location"]["address"] + "</p>"
            + "<p>" + data[x]["location"]["neighborhoods"] + "</p></div>"
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

    $('#event_address').val($('.results-element p').text());
    $('#event_location').val($('.results-element h3').text());
    $('#event_image').val($('.results-element img')[0].src);
  };

  $('body').on('click', '.venue-container', choose);

});