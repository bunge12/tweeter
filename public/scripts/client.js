/*
 * Client-side JS logic
 */

$(document).ready(function () {

  // Submit tweet processor
  $("#submit_tweet").submit(function (event) {
    event.preventDefault();
    $(".error").remove();
    let form = $(this);
    if ($("#new_tweet").val().length < 1) {
      showError('Your tweet must be more than 0 characters!');
    } else if ($("#new_tweet").val().length > 140) {
      showError('Your tweet can\'t be over 140 characters!');
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets/',
        data: form.serialize(),
        complete: function () {
          $.ajax('/tweets', { method: 'GET' })
            .then(function (data) {
              let item = data[data.length - 1];
              $("#new_tweet").val('');
              $("#char_count").html(140);
              $('#tweets').prepend(createTweetElement(item));
            });
        }
      });
    }
  });

  // Merge all tweets on page load
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });

  // Show/hide "compose" and "scroll up"
  $(document).scroll(function () {
    let y = $(this).scrollTop();
    if (y > 150) {
      $(".slide_up").fadeIn();
      $(".compose").fadeOut();
    }
    if (y > 500) {
      $(".new_tweet_compose").fadeOut();
    }
    if (y < 150) {
      $(".slide_up").fadeOut();
      $(".compose").fadeIn();
    }
  });

  // "Scroll up" & "Compose" click functionality
  $(".slide_up, .compose").click(function () {
    window.scrollTo(0, 0);
    $(".new_tweet_compose").slideToggle(500);
    $("#new_tweet").focus();
  });

});