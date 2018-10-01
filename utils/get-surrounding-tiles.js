const getSurroundingTiles = (tile, boardWidth) => {
  // need to check if at edge of row
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
};

export default getSurroundingTiles;
