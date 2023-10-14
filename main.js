let playerTurn = "X";

$(document).ready(function () {
  setupBoard();
  $("#resetBtn").click(() => reset(layers));
});
