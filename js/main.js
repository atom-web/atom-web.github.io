(function () {
  $('.hamburger-menu').on('click', function() {
    $(this).toggleClass('animate')
    $('.bar').toggleClass('animate');
  })
})();

$( document ).ready(function() {
    $('.hamburger-menu').click(function(){
    $( "nav" ).toggleClass('nav-active');
  });
});