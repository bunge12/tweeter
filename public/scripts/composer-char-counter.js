/* Function to count of entered characters, display the CountQueuingStrategy, and update the counter color to red when chracter count exceeds 140 chars */

$(document).ready(function () {
  $("#new_tweet").on('input', function () {
    $("#char_count").html(140 - this.value.length);
    if (this.value.length > 140) {
      $("#char_count").css("color", "red");
    } else {
      $("#char_count").css("color", "#545149");
    }
  });
});