$(function(){

  var $itemContent = $(".popout");
  $(".open-popout").click(function(e){
    e.preventDefault();
    $itemContent.animate({'margin-left': 0}, 200);
  });

  $(".popout").click(function(e){
    $itemContent.animate({'margin-left': '-50%'}, 200);
  });

});