$(document).ready(function () {
  /*         const count = document.getElementById('new_tweet');
          document.addEventListener('keyup', updateCounter);
          function updateCounter(e) {
            // let curr = document.getElementById("char_count").innerHTML;
            // document.getElementById("char_count").innerHTML = curr - 1;
            document.getElementById("char_count").innerHTML = 140 - count.value.length;
          } */
  $("#new_tweet").on('keyup', function () {
    $("#char_count").html(140 - this.value.length);
    if (this.value.length > 140) {
      $("#char_count").css("color", "red");
    } else {
      $("#char_count").css("color", "#545149");
    }
  })
});