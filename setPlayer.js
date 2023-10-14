const setPlayer = (player) => {
  playerTurn = player
  $("#playerPrompt").text(`${player} to Play`);
};
