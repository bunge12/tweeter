/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const $markup = `
    <article class="single_tweet">
      <header>
        <img src="${tweet.user.avatars}">
        <h2>${tweet.user.name}</h2>
        <span class='username right'>${tweet.user.handle}</span>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <hr />
      <footer>
        <span>${tweet.created_at}</span>
        <span class='right'>
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

/* $(document).ready(function () {
  renderTweets(data);
}); */

$(document).ready(function () {
  $("#submit_tweet").submit(function (event) {
    event.preventDefault();
    let form = $(this);
    if ($("#new_tweet").val().length < 1) {
      alert('Your tweet must be over 0 characters!');
    } else if ($("#new_tweet").val().length > 140) {
      alert('Your tweet can\'t be over 140 characters!');
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
              $('#tweets').prepend(createTweetElement(item));
            });
        }
      }).then(function () {
        $("#new_tweet").reset();
      });
    }
  });
});

$(document).ready(function () {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
});

$(document).ready(function () {
  $(".button_new").click(function () {
    $(".new_tweet_compose").slideToggle(500);
    $("#new_tweet").focus();
  });
});