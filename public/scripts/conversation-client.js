$(document).ready(function() {

  const loadPage = function() {
    $.ajax('/messages/1/1/3');
  };

  $('.message_form').submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/messages/1/3',
      data: $(this).serialize(),
    });
    loadPage();
  });
  
});