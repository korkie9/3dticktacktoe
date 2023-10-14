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
    console.log("3d diag");
  if (
    layers[0][0][2] === layers[1][1][1] &&
    layers[1][1][1] === layers[2][2][0] &&
    layers[0][0][2] === symbol
  )
    console.log("3d diag");
  if (
    layers[0][2][0] === layers[1][1][1] &&
    layers[1][1][1] === layers[2][0][2] &&
    layers[0][2][0] === symbol
  )
    console.log("3d diag");
  if (
    layers[0][2][2] === layers[1][1][1] &&
    layers[1][1][1] === layers[2][0][0] &&
    layers[0][2][2] === symbol
  )
    console.log("3d diagonal");
};

const checkHeight = (symbol) => {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (
        layers[0][x][y] === layers[1][x][y] &&
        layers[1][x][y] === layers[2][x][y] &&
        layers[0][x][y] === symbol
      )
        console.log("matches");
    }
  }
};

const checkDiagonals = (symbol) => {
  layers.forEach((layer) => {
    const checkFirstDiagonal =
      layer[0][0] === layer[1][1] &&
      layer[1][1] === layer[2][2] &&
      layer[0][0] === symbol;
    const checkSecondDiagonal =
      layer[0][2] === layer[1][1] &&
      layer[1][1] == layer[2][0] &&
      layer[0][2] === symbol;
    if (checkFirstDiagonal) console.log("blyaaat suka naxuy");
    if (checkSecondDiagonal) console.log("blyaaat suka naxuy");
  });
};

const checkColumns = (symbol) => {
  layers.forEach((layer) => {
    const stringToMatch = `${symbol}${symbol}${symbol}`;
    let matchingString = "";

    for (let column = 0; column < 3; column++) {
      layer.forEach((row) => {
        matchingString += row[column];
      });
      if (matchingString === stringToMatch) console.log("blyaaaaaaat suka");
      matchingString = "";
    }
  });
};
const checkRows = (symbol) => {
  //Check rows
  const layersString = layers.join().replace(/,/g, "").replace(/.{3}/g, "$&,");
  const threeItemsInArows = `${symbol}${symbol}${symbol}`;
  if (layersString.includes(threeItemsInArows)) console.log("blyaaaaaaat");
};

const checkWinner = () => {
  checkRows(playerTurn);
  checkColumns(playerTurn);
  checkDiagonals(playerTurn);
  checkHeight(playerTurn);
  check3DDiagonals(playerTurn);
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
