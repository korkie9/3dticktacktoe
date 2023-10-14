const check3DDiagonals = (symbol, layers) => {
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

const checkHeight = (symbol, layers) => {
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

const checkDiagonals = (symbol, layers) => {
  let hasWinner = false;
  layers.forEach((layer) => {
    const checkFirstDiagonal =
      layer[0][0] === layer[1][1] &&
      layer[1][1] === layer[2][2] &&
      layer[0][0] === symbol;
    if (checkFirstDiagonal) {
      hasWinner = true;
      return;
    }

    const checkSecondDiagonal =
      layer[0][2] === layer[1][1] &&
      layer[1][1] == layer[2][0] &&
      layer[0][2] === symbol;
    if (checkSecondDiagonal) {
      hasWinner = true;
      return;
    }
  });
  return hasWinner;
};

const checkColumns = (symbol, layers) => {
  let hasWinner = false;
  layers.forEach((layer) => {
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      if (
        layer[0][columnIndex] === layer[1][columnIndex] &&
        layer[1][columnIndex] == layer[2][columnIndex] &&
        layer[0][columnIndex] === symbol
      ) {
        console.log("blyaaaat");
        hasWinner = true;
        break;
      }
    }
  });
  return hasWinner;
};
const checkRows = (symbol, layers) => {
  //Check rows
  const layersString = layers.join().replace(/,/g, "").replace(/.{3}/g, "$&,");
  const threeItemsInArows = `${symbol}${symbol}${symbol}`;
  return !!layersString.includes(threeItemsInArows);
};

const checkWinner = (playerTurn, layers) => {
  if (checkRows(playerTurn, layers)) {
    reset();
    return alert(`${playerTurn} wins`);
  }
  if (checkColumns(playerTurn, layers)) {
    reset();
    return alert(`${playerTurn} wins`);
  }
  if (checkDiagonals(playerTurn, layers)) {
    reset();
    return alert(`${playerTurn} wins`);
  }
  if (checkHeight(playerTurn, layers)) {
    reset();
    return alert(`${playerTurn} wins`);
  }
  if (check3DDiagonals(playerTurn, layers)) {
    reset();
    return alert(`${playerTurn} wins`);
  }
  setPlayer(playerTurn === 'X' ? '0' : 'X')
};
