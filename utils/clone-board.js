const cloneBoard = board => {
  return board.map(row =>
    row.map(tile => ({
      value: tile.value,
      displayed: tile.displayed,
      id: tile.id
    }))
  );
};

export default cloneBoard;
