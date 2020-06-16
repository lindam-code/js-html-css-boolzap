$(document).ready(function(){

  // Aggiungere messaggi alla chat quando clicco icona aeroplanino
  $('#submit-message').click(function(){
    var message = $('.message').val();
    var cloneMessage = $('.template .single-message').clone();
    cloneMessage.child('p').text(message);
    console.log(cloneMessage);
    $('.message').val('cloneMessage');
    $('.chat-container').append()
  });







});
