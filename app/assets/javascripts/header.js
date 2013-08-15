$(function(){

  var $itemContent = $(".popout");

  $(".open-popout").click(function(e){
    e.preventDefault();
    $itemContent.animate({'margin-left': 0}, 200);
  });

  $(".popout").click(function(){
    $itemContent.animate({'margin-left': '-90%'}, 200);
  });

});