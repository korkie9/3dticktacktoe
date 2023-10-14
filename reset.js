const reset = () => {
  layers.forEach((layer, layerIndex) => {
    layer.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        layers[layerIndex][rowIndex][columnIndex] = ".";
      });
    });
  });
  setPlayer('X');
  $("img").remove("#xoimg");
  console.log("reset");
};
