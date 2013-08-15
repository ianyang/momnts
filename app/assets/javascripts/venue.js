$(function() {
  "use strict";

  $('.venue form').on("submit", function(event) {
    event.preventDefault();
  });

  $('.search-icon').click(function(event) {
    event.preventDefault();

    $('.results').empty();

    var searchFind = $('#find').val();
    var searchPlace = $('#place').val();

    $.ajax({
      url: "/search",
      method: "get",
      dataType: "json",
      data: {"find": searchFind, "place": searchPlace},
      success: function(data) {
        $.each(data, function(x) {
          $('.results').append('<div class="results-element">'
            + "<a href='" + data[x]["url"] + "'><img src='" + data[x]["image_url"] + "' /></a>"
            + "<h3>" + data[x]["name"] + "</h3>"
            + "<p>" + data[x]["location"]["display_address"] + "</p>"
            + '</div>');
        });
      }
    })

  });

  function choose(event) {
    event.preventDefault();

    var $this = $(this);
    $('.venue-results').empty();
    $('.venue-results').append('<h2>You have chosen<h2>');
    $('.venue-results').append($this);

    $this.css('border', '5px solid rgba(22,160,133,1)');

    $('#event_address').val($('.results-element p').text());
    $('#event_location').val($('.results-element h3').text());
    $('#event_image').val($('.results-element img')[0].src);
  };

  $('body').on('click', '.results-element', choose);

});