$(function() {
"use strict";

  $('.locationsearch form').on("submit", function(event) {
      event.preventDefault();

      $('.resultslist').empty();

      var searchFind = $('#find').val();
      var searchPlace = $('#place').val();

      $.ajax({
          url: "/search",
          method: "get",
          dataType: "json",
          data: {"find": searchFind, "place": searchPlace},
          success: function(data) {
            $.each(data, function(x) {
              $('.resultslist').append('<div class="results_element">'
                + "<a href='" + data[x]["url"] + "'><img src='" + data[x]["image_url"] + "' /></a>"
                + "<h3>" + data[x]["name"] + "</h3>"
                + "<p>" + data[x]["location"]["display_address"] + "</p>"
                + '</div>');

            });
          }
      })

      $('body').fadeOut(400);
      $('body').fadeIn(400);

  });

  function choose(event) {
      event.preventDefault();

      var $this = $(this);
      $('.resultslist').empty();
      $('.resultslist').append('<h2>You have chosen<h2>');
      $('.resultslist').append($this);

      $this.css('border', '5px solid rgba(22,160,133,1)');

      $('#event_address').val($('.results_element p').text());
      $('#event_location').val($('.results_element h3').text());
      $('#event_image').val($('.results_element img')[0].src);

  }

  $('body').on('click', '.results_element', choose);

});
