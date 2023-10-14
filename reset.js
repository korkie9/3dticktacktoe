const reset = () => {
  layers.forEach((layer, layerIndex) => {
    layer.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        layers[layerIndex][rowIndex][columnIndex] = ".";
      });
    });
  });
  setPlayer('X');
  $('.drawer').drawer('close');
  $("img").remove("#xoimg");
  console.log("reset");
};
