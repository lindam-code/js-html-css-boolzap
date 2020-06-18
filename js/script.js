$(document).ready(function(){

  // Aggiungere messaggi alla chat cliccando icona aeroplanino
  $('#submit-message').click(function(){
    sendMessage();
    // Invia una risposta dell'interlocutore dopo un secondo
    setTimeout(function(){
      sendAnswer();
  }, 1000);
  });

  // Aggiungere messaggi alla chat cliccando invio
  $('#message-input').keypress(function(event){
    if (event.which === 13) {
      sendMessage();
      // Invia una risposta dell'interlocutore dopo un secondo
      setTimeout(function(){
        sendAnswer();
    }, 1000);
    }
  });

  // Ricerca contatti: digitando le lettere mostro
  // solo i contatti che hanno quelle lettere
  // $('#search-contact').keyup(function(event){
  //
  //   $('.contact-item').each(function () {
  //     var testoCercato = $('#search-contact').val().toLowerCase();
  //     console.log(testoCercato);
  //     var nomeContattoCorrente = $(this).find('.contact-name').text().toLowerCase();
  //     console.log(nomeContattoCorrente);
  //
  //     if (nomeContattoCorrente.includes(testoCercato)) {
  //       $(this).show();
  //     } else {
  //       $(this).hide();
  //     }
  //
  //   });

  // Ricerca contatti con .filter di JQuery.
  $("#search-contact").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".contact-item").filter(function() {
    $(this).toggle($(this).find('.contact-name').text().toLowerCase().indexOf(value) > -1)
    });
  });

  // Rendere visibile la finsetra per cancelleare i messaggi
  // Quando entro con il mouse nella finestra del messaggio, appare
  $('.single-message').mouseenter(function () {
    $(this).children('.message-action').addClass('active');
    $(this).siblings().children('.message-action').removeClass('active');
  });
  // Quando clicco sulla freccia, appare e scompare
  $('.message-arrow').click(function(){
    $(this).siblings('.message-action').toggleClass('active');
  });
  // Siccome con il mouse enter, la faccio apparire ma rimane visibile
  // devo farla chiudere in un messaggio se clicco da la freccia
  // in un altro messaggio



  // Funzioni
  // Funzione che invia il messaggio dell'utente nella chat
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

  // Funzione per inviare la risposta dell'iterlocutore
  function sendAnswer() {
    // Clona template messaggio
    var cloneMessage = $('.template > .single-message').clone();
    // Aggiunge il testo del messaggio
    cloneMessage.find('.text-message').append('Ok!');
    // Aggiunge la classe messaggio ricevuto
    cloneMessage.addClass('received-message');
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
  };

  // Funzione per aggiungere zero ad un numero quando è minore di 10
  function addZeroToNumber(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  };

});
