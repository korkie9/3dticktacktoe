let layers = [
  [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ],
  [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ],
  [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ],
];

const layerReset = [
  [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ],
  [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ],
  [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ],
];

let playerTurn = "X";

const setPlayer = (player) => {
  playerTurn = playerTurn === "X" ? "0" : "X";
  $("#playerPrompt").text(`${playerTurn} to Play`);
};

const reset = () => {
  layers.forEach((layer, layerIndex) => {
    layer.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        layers[layerIndex][rowIndex][columnIndex] = ".";
      });
    });
  });
  setPlayer(1);
  $("img").remove("#xoimg");
  console.log("reset");
};

const check3DDiagonals = (symbol) => {
  //TODO: there's probably a for loop here somewhere
  if (
    layers[0][0][0] === layers[1][1][1] &&
    layers[1][1][1] === layers[2][2][2] &&
    layers[0][0][0] === symbol
  )
    return true;
  if (
    layers[0][0][2] === layers[1][1][1] &&
    layers[1][1][1] === layers[2][2][0] &&
    layers[0][0][2] === symbol
  )
    return true;
  if (
    layers[0][2][0] === layers[1][1][1] &&
    layers[1][1][1] === layers[2][0][2] &&
    layers[0][2][0] === symbol
  )
    return true;
  return !!(
    layers[0][2][2] === layers[1][1][1] &&
    layers[1][1][1] === layers[2][0][0] &&
    layers[0][2][2] === symbol
  );
};

const checkHeight = (symbol) => {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (
        layers[0][x][y] === layers[1][x][y] &&
        layers[1][x][y] === layers[2][x][y] &&
        layers[0][x][y] === symbol
      )
        return true;
    }
  }
  return false;
};

const checkDiagonals = (symbol) => {
  layers.forEach((layer) => {
    const checkFirstDiagonal =
      layer[0][0] === layer[1][1] &&
      layer[1][1] === layer[2][2] &&
      layer[0][0] === symbol;
    if (checkFirstDiagonal) return true;

    const checkSecondDiagonal =
      layer[0][2] === layer[1][1] &&
      layer[1][1] == layer[2][0] &&
      layer[0][2] === symbol;
    if (checkSecondDiagonal) return true;
  });
  return false;
};

const checkColumns = (symbol) => {
  layers.forEach((layer) => {
    const stringToMatch = `${symbol}${symbol}${symbol}`;
    let matchingString = "";

    for (let column = 0; column < 3; column++) {
      layer.forEach((row) => {
        matchingString += row[column];
      });
      if (matchingString === stringToMatch) return true;
      matchingString = "";
    }
  });
  return false;
};
const checkRows = (symbol) => {
  //Check rows
  const layersString = layers.join().replace(/,/g, "").replace(/.{3}/g, "$&,");
  const threeItemsInArows = `${symbol}${symbol}${symbol}`;
  return !!layersString.includes(threeItemsInArows);
};

const checkWinner = () => {
  if (checkRows(playerTurn)) return alert(`${playerTurn} wins`);
  if (checkColumns(playerTurn)) return alert(`${playerTurn} wins`);
  if (checkDiagonals(playerTurn)) return alert(`${playerTurn} wins`);
  if (checkHeight(playerTurn)) return alert(`${playerTurn} wins`);
  if (check3DDiagonals(playerTurn)) return alert(`${playerTurn} wins`);
};

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
  checkWinner();
  playerTurn = playerTurn == "X" ? "0" : "X";
  $("#playerPrompt").text(`${playerTurn} to Play`);
};

$(document).ready(function () {
  //create tables
  layers.forEach((layer, layerIndex) => {
    $(`#layer${layerIndex}`)
      .append(`<table id="layer${layerIndex}Table"></table>
        `);
  });
  for (let layerIndex = 0; layerIndex < 3; layerIndex++) {
    layers.forEach((row, rowIndex) => {
      $(`#layer${layerIndex}Table`).append(
        `<tr id=layer${layerIndex}Row${rowIndex}></tr>`
      );
      row.forEach((column, columnIndex) => {
        $(`#layer${layerIndex}Row${rowIndex}`).append(
          `<th>
          <button id=layer${layerIndex}Row${rowIndex}Column${columnIndex} class="blockButton"></button>
          </th>`
        );
        const blockId = `#layer${layerIndex}Row${rowIndex}Column${columnIndex}`;
        $(blockId).click(() =>
          selectTile(layerIndex, rowIndex, columnIndex, blockId)
        );
      });
    });
  }
  $("#resetBtn").click(() => reset());
});
