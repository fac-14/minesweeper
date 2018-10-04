const getSurroundingTiles = (tile, boardWidth) => {
  // need to check if at edge of row
  if (tile % 30 == 0) {
    return [
      tile - boardWidth,
      tile - (boardWidth - 1),
      tile + 1,
      tile + boardWidth,
      tile + (boardWidth + 1)
    ];
  } else if ((tile + 1) % 30 == 0) {
    return [
      tile - (boardWidth + 1),
      tile - boardWidth,
      tile - 1,
      tile + (boardWidth - 1),
      tile + boardWidth
    ];
  } else {
    return [
      tile - (boardWidth + 1),
      tile - boardWidth,
      tile - (boardWidth - 1),
      tile - 1,
      tile + 1,
      tile + (boardWidth - 1),
      tile + boardWidth,
      tile + (boardWidth + 1)
    ];
  }
};

export default getSurroundingTiles;
