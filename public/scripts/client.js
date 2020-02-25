/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
}

const renderTweets = (tweets) => {

  for (const tweet of tweets) {

    $('#tweets').append(createTweetElement(tweet));
  }

}

renderTweets(data);
