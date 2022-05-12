$(document).ready(function() {

  $('.favourite').submit(function(event) {
    event.preventDefault();

    if ($('.favourite_button').hasClass('red')) {
      $.ajax({
        method: 'POST',
        url: '/favourites/delete',
        data: $(this).serialize(),
      });

      $('.favourite_button').removeClass('red');
    } else {
      $.ajax({
        method: 'POST',
        url: '/favourites',
        data: $(this).serialize(),
      });
  
      $('.favourite_button').addClass('red');
    }
  });
  
  $('.send_ajax').submit(function(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: 'messages/add',
      data: $(this).serialize(),
    })

    $('.message_form').addClass('hide');
    $('.message_sent').removeClass('hide');
  });
  
});