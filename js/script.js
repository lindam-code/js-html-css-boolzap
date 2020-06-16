$(document).ready(function(){

  // Aggiungere messaggi alla chat cliccando icona aeroplanino
  $('#submit-message').click(function(){
    var message = $('#message-input').val();
    var cloneMessage = $('.template > .single-message').clone();
    cloneMessage.find('.message-text').append(message);
    cloneMessage.addClass('sent-message');
    $('.chat-container').append(cloneMessage);
    $('#message-input').val('');
  });

  // Aggiungere messaggi alla chat cliccando invio
  $('#message-input').keypress(function(event){
    if (event.which === 13) {
      var message = $('#message-input').val();
      var cloneMessage = $('.template > .single-message').clone();
      cloneMessage.find('.message-text').append(message);
      cloneMessage.addClass('sent-message');
      $('.chat-container').append(cloneMessage);
      $('#message-input').val('');
    }
  });

});
