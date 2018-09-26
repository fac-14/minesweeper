import React from "react";
import Tile from "./tile";
import getRandomInt from "../utils/random-number";
// import some funcationality some utils

class Board extends React.Component {
  state = {
    boardArray: this.createBoardArray(16, 30)
  };

  createBoardArray(x, y) {
    let newArray = Array(x).fill(undefined);
    return newArray.map(() => Array(y).fill(new Tile()));
  }

  initialiseBoard() {
    let mines = 0;
    while (mines < 99) {
      // get random x, y numbers (range 0-99)
      let x = getRandomInt(99),
        y = getRandomInt(99);
      console.log(x, y);
      // check that tile for mine
      // if no mine:
      //   place mine
      //   for all surrounding tiles, if not mine add 1 to value
      //   mines++
      // else:
      //   loop again
    }
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
