const setupBoard = () => {
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
};
