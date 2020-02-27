/*
 * Helper functions to create & display tweets
 */

// Error Generator
const showError = (message) => {
  return $("section").append(`<div class='error'>${message}</div>`);
}

// Escape user-input chars
const escapeCharacters = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Calculate days since post
const daysCalculator = (timestamp) => {
  const difference = Date.now() - timestamp;
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  let result = '';
  if (daysDifference < 1) {
    result = 'Less than a day ago';
  } else {
    result = daysDifference + ' days ago';
  }
  return (result);
};

// Markup template
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

// Looping through DB
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#tweets').prepend(createTweetElement(tweet));
  }
};