import React from "react";
import Tile from "./tile";
// import some funcationality some utils

class Board extends React.Component {
  state = {
    // mines
    // boardArray
  };

  // createBoard():
  //   place 99 random mines
  //   set correct numbers

  // endGame(win/lose):
  //   display board
  //   display win/lose

  render() {
    const testArray = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]];
    return (
      <div id="grid">
        {testArray.map(row => (
          <p key={row}>{row.map(tile => <p key={tile}>{tile}</p>)}</p>
        ))}
      </div>
    );
  }
}

export default Board;
