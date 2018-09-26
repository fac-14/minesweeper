import React from "react";
import Tile from "./tile";
// import some funcationality some utils

class Board extends React.Component {
  state = {
    // mines
    boardArray: this.createBoardArray(16, 30)
  };
  createBoardArray(x, y) {
    let newArray = Array(x).fill(undefined);
    return newArray.map(() => Array(y).fill(new Tile()));
  }

  // createBoard():
  //   place 99 random mines
  //   set correct numbers

  // endGame(win/lose):
  //   display board
  //   display win/lose

  render() {
    let keyTest = 0;
    return (
      <div id="grid">
        {this.state.boardArray.map(row =>
          row.map(tile => <p key={keyTest++}>{tile.state.value}</p>)
        )}
      </div>
    );
  }
}

export default Board;
