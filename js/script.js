$(document).ready(function(){

  // Aggiungere messaggi alla chat cliccando icona aeroplanino
  $('#submit-message').click(function(){
    sendMessage();
  });

  // Aggiungere messaggi alla chat cliccando invio
  $('#message-input').keypress(function(event){
    if (event.which === 13) {
      sendMessage();
    }
  });

  // Funzioni
  // Funzione che invia il messaggio dell'utente nella charset
  function sendMessage() {
    var message = $('#message-input').val();
    if (message != '') {
      // Clona template messaggio
      var cloneMessage = $('.template > .single-message').clone();
      // Aggiunge il testo del messaggio
      cloneMessage.find('.text-message').append(message);
      // Aggiunge la classe messaggio inviato
      cloneMessage.addClass('sent-message');
      // Inserisce orario del messaggio
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var currentTime = addZeroToNumber(hours) + ':' + addZeroToNumber(minutes);
      cloneMessage.find('.time-message').text(currentTime);
      // Appende al contenitore della chat il messaggio
      $('.chat-container').append(cloneMessage);
      // Scrollo all'ultimo messaggio inviato
      $('.chat-wrapper').scrollTop($('.chat-wrapper').height());
      // Pulisco l'input
      $('#message-input').val('');

    };
  };

  // Funzione per aggiungere zero ad un numero quando è minore di 10
  function addZeroToNumber(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  };

});
