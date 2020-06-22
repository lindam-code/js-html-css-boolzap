$(document).ready(function(){

  // Aggiungere messaggi alla chat cliccando icona aeroplanino
  $('#submit-message').click(function(){
    var message = $('#message-input').val();
    var classSent = 'sent-message';
    if (message != '') {
      sendNewMessage(message, classSent);
      // Invia una risposta dell'interlocutore dopo un secondo
      setTimeout(function(){
        var messageAnswer = 'ehiiilaaaa!?';
        var classReceived = 'received-message';
        sendNewMessage(messageAnswer, classReceived);
      }, 1000);
    };
  });

  // Aggiungere messaggi alla chat cliccando invio
  $('#message-input').keypress(function(event){
    if (event.which === 13) {
      var message = $('#message-input').val();
      var classSent = 'sent-message';
      sendNewMessage(message, classSent);
      // Invia una risposta dell'interlocutore dopo un secondo
      setTimeout(function(){
        var messageAnswer = 'ehiiilaaaa!?';
        var classReceived = 'received-message';
        sendNewMessage(messageAnswer, classReceived);
      }, 1000);
    }
  });

  // Ricerca contatti: digitando le lettere mostro
  // solo i contatti che hanno quelle lettere
  $('#search-contact').keyup(function(event){
    // Per ogni contatto cerco nel nome le lettere digitate dall'utente
    $('.contact-item').each(function () {
      var testoCercato = $('#search-contact').val().toLowerCase();
      console.log(testoCercato);
      var nomeContattoCorrente = $(this).find('.contact-name').text().toLowerCase();
      console.log(nomeContattoCorrente);
      // Mostro solo i contatti che hanno le lettere digitate nel nome
      // gli altri contatti sono nascosti
      if (nomeContattoCorrente.includes(testoCercato)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Ricerca contatti con .filter di JQuery.
  // Associa alla barra di ricerca un evento keyup, cioè ogni volta
  // che rilascio un tasto/lettera ne registra il valore
  // $("#search-contact").on("keyup", function() {
  //   var value = $(this).val().toLowerCase();
  //   // Con la funzione filter, filtra tra il nome dei contatti, quelli che
  //   // contengono le lettere scritte nella barra di ricerca e li mostra
  //   // nascondendo i contatti che nel nome non contengono le lettere digitate
  //   $(".contact-item").filter(function() {
  //   $(this).toggle($(this).find('.contact-name').text().toLowerCase().indexOf(value) > -1)
  //   });
  // });

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

    // Metto sfondo grigio al contatto selezionato
    $(this).siblings('.contact-item').removeClass('selected');
    $(this).addClass('selected');

    // Mostra nell'header il nome e l'avatar corrispondente
    var contactName = $(this).find('.contact-name').text();
    $('.main .header .contact-name').text(contactName);
    var contactAvatar = $(this).find('.avatar img').attr('src');
    $('.main .header .avatar img').attr('src', contactAvatar);
  });

  // Quando l'imput per scrivere un messaggio ha il focus il tasto invia diventa
  // un aereoplanono di carta, di default è un microfono

  $('.type-message #message-input').focus(function(){
    $('.type-message #submit-message').removeClass('fa-microphone').addClass('fa-paper-plane');
  });

  $('.type-message #message-input').blur(function(){
    $('.type-message #submit-message').removeClass('fa-paper-plane').addClass('fa-microphone');
  });
  
  // FUNZIONI
  // Funzione che appende nella chat un nuovo messaggio
  // posso usarla sia per i messaggi inviati che per le risposte automatiche
  // dandogli come argomenti: testo del messaggio e classe da appendere (send o received)
  function sendNewMessage(messageToSend, classToAppend) {
    var message = messageToSend;
    // Clona template messaggio
    var cloneMessage = $('.template > .single-message').clone();
    // Aggiunge il testo del messaggio
    cloneMessage.find('.text-message').append(message);
    // Aggiunge la classe messaggio inviato
    cloneMessage.addClass(classToAppend);
    // Inserisce orario del messaggio
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var currentTime = addZeroToNumber(hours) + ':' + addZeroToNumber(minutes);
    cloneMessage.find('.time-message').text(currentTime);
    // Appende al contenitore della chat che è attiva il messaggio
    $('.chat-container.active').append(cloneMessage);
    // Scrollo all'ultimo messaggio inviato
    $('.chat-wrapper').scrollTop($('.chat-wrapper').height());
    // Pulisco l'input
    $('#message-input').val('');
  };

  // Funzione che invia il messaggio dell'utente nella chat e dopo un secondo
  // da un messaggio di risposta con scritto ok
  // function sendMessage() {
  //   var message = $('#message-input').val();
  //   if (message != '') {
  //     // Clona template messaggio
  //     var cloneMessage = $('.template > .single-message').clone();
  //     // Aggiunge il testo del messaggio
  //     cloneMessage.find('.text-message').append(message);
  //     // Aggiunge la classe messaggio inviato
  //     cloneMessage.addClass('sent-message');
  //     // Inserisce orario del messaggio
  //     var date = new Date();
  //     var hours = date.getHours();
  //     var minutes = date.getMinutes();
  //     var currentTime = addZeroToNumber(hours) + ':' + addZeroToNumber(minutes);
  //     cloneMessage.find('.time-message').text(currentTime);
  //     // Appende al contenitore della chat che è attiva il messaggio
  //     $('.chat-container.active').append(cloneMessage);
  //     // Scrollo all'ultimo messaggio inviato
  //     $('.chat-wrapper').scrollTop($('.chat-wrapper').height());
  //     // Pulisco l'input
  //     $('#message-input').val('');
  //     // Invia una risposta dell'interlocutore dopo un secondo
  //     setTimeout(function(){
  //       sendAnswer();
  //     }, 1000);
  //   };
  // };

  // Funzione per inviare la risposta dell'iterlocutore
  // function sendAnswer() {
  //   // Clona template messaggio
  //   var cloneMessage = $('.template > .single-message').clone();
  //   // Aggiunge il testo del messaggio
  //   cloneMessage.find('.text-message').append('Ok!');
  //   // Aggiunge la classe messaggio ricevuto
  //   cloneMessage.addClass('received-message');
  //   // Inserisce orario del messaggio
  //   var date = new Date();
  //   var hours = date.getHours();
  //   var minutes = date.getMinutes();
  //   var currentTime = addZeroToNumber(hours) + ':' + addZeroToNumber(minutes);
  //   cloneMessage.find('.time-message').text(currentTime);
  //   // Appende al contenitore della chat il messaggio
  //   $('.chat-container.active').append(cloneMessage);
  //   // Scrollo all'ultimo messaggio inviato
  //   $('.chat-wrapper').scrollTop($('.chat-wrapper').prop('scrollHeight'));
  // };

  // Funzione per aggiungere zero ad un numero quando è minore di 10
  function addZeroToNumber(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  };

});
