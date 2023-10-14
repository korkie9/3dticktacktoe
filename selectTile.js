const selectTile = (layerIndex, rowIndex, columnIndex, blockId) => {
  const block = layers[layerIndex][rowIndex][columnIndex];
  //If there is a x or o, do nothing
  if (block === "X" || block === "0")
    return alert("There is already a character on this square");
  //append x or o img
  $(blockId).append(`<img src="./assets/${
    playerTurn === "X" ? "ex" : "o"
  }.png" alt="x" width='80%' height='80%' id="xoimg">
  `);
  //this order is important
  layers[layerIndex][rowIndex][columnIndex] = playerTurn;
  checkWinner(playerTurn, layers);
};
