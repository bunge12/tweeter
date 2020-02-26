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
      <p>${tweet.content.text}</p>
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
    $('#tweets').append(createTweetElement(tweet));
  }
};

/* $(document).ready(function () {
  renderTweets(data);
}); */

$(document).ready(function () {
  $("#submit_tweet").submit(function (event) {
    event.preventDefault();
    let form = $(this);
    $.ajax({
      type: 'POST',
      url: '/tweets/',
      data: form.serialize()
    })
  });
});

$(document).ready(function () {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    })
});