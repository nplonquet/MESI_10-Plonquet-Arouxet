$(document).ready(function() {

  window.MyApp = window.MyApp || {};
  window.MyApp.alertBox = $( '#alert-box' );

  window.MyApp.alert = function( status, message ) {
    MyApp.alertBox.removeClass( 'alert-danger alert-success' )
    .addClass( 'show alert-' + status )
    .html( message );

    setTimeout( function() {
      MyApp.alertBox.removeClass( 'show' );
    }, 5000 );
  }
});