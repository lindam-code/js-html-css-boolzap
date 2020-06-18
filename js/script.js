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

  // Rendere visibile la finestra per cancelleare i messaggi
  // Quando clicco sulla freccia, appare e scompare
  // se esco dal messaggio con la finestra aperta lei rimane tale
  // percioò se clicco la freccia in un altro messaggio deve contestualmente
  // chiudere le latre finestre
  $(document).on('click', '.message-arrow', function(){
    $(this).siblings('.message-action').toggleClass('active');
    $(this).parents('.single-message').siblings().find('.message-action').removeClass('active');
  });

  // Cancellare il messaggio quando clicco su cancella messaggio
  $(document).on('click', '.delete-message', function(){
    $(this).parents('.single-message').remove();
  });

  // Click sul contatto mostra la conversazione del contatto cliccato,
  // è possibile inserire nuovi messaggi per ogni conversazione
  $('.contact-item').click(function(){
    var valoreAttributoContatto = $(this).attr('data-contact');
    var selettoreChatCorrispondente = '.chat-container[data-chat="'+ valoreAttributoContatto +'"]';
    $('.chat-container').removeClass('active');
    $(selettoreChatCorrispondente).addClass('active');
    // Mostra nell'header il nome e l'avatar corrispondente
    var contactName = $(this).find('.contact-name').text();
    $('.main .header .contact-name').text(contactName);
    var contactAvatar = $(this).find('.avatar img').attr('src');
    $('.main .header .avatar img').attr('src', contactAvatar);
  });

  // Funzioni
  // Funzione che invia il messaggio dell'utente nella chat e dopo un secondo
  // da un messaggio di risposta con scritto ok
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
      // Appende al contenitore della chat che è attiva il messaggio
      if ( $('.chat-container').hasClass('active') === true) {
        $('.chat-container').append(cloneMessage);
      };
      // Scrollo all'ultimo messaggio inviato
      $('.chat-wrapper').scrollTop($('.chat-wrapper').height());
      // Pulisco l'input
      $('#message-input').val('');
      // Invia una risposta dell'interlocutore dopo un secondo
      setTimeout(function(){
        sendAnswer();
    }, 1000);
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
