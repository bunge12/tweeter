/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = (tweet) => {
  const $markup = `
    <article class="single_tweet">
      <header>
        <img src="${tweet.user.avatars}">
        <h2>${tweet.user.name}</h2>
        <span class='username right'>${tweet.user.handle}</span>
      </header>
      <p>${escapeCharacters(tweet.content.text)}</p>
      <hr />
      <footer>
        <span>${daysCalculator(tweet.created_at)}</span>
        <span class='right icons'>
          <img src="/images/flag.png" alt="Flag Item icon">
          <img src="/images/loop.png" alt="Repost Item icon">
          <img src="/images/heart.png" alt="Like Item icon">
        </span>
      </footer>
    </article>
  `;
  return $markup;
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#tweets').prepend(createTweetElement(tweet));
  }
};

$(document).ready(function () {
  $("#submit_tweet").submit(function (event) {
    event.preventDefault();
    $(".error").remove();
    let form = $(this);
    if ($("#new_tweet").val().length < 1) {
      $("section").append("<div class='error'>Your tweet must be more than 0 characters!</div>");
    } else if ($("#new_tweet").val().length > 140) {
      $("section").append("<div class='error'>Your tweet can\'t be over 140 characters!</div>");
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
      })
    }
  });

  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });

  $(".compose").click(function () {
    $(".new_tweet_compose").slideToggle(500);
    $("#new_tweet").focus();
  });

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
  })

  $(".slide_up").click(function () {
    window.scrollTo(0, 0);
    $(".new_tweet_compose").slideToggle(500);
    $("#new_tweet").focus();
  })

});