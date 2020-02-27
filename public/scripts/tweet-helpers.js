/*
 * Helper functions to display single tweets
 */

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