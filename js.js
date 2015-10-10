$( ".whiteboard" ).mousemove(function( event ) {
  msg += event.pageX + ", " + event.pageY;
  $( ".rightPanel" ).append(msg + "<br />" );
});