import React from "react";
import Tile from "./tile";
import getRandomInt from "../utils/random-number";
// import some funcationality some utils

class Board extends React.Component {
  state = {
    boardArray: this.createBoardArray(16, 30)
  };

  createBoardArray(x, y) {
    const newArray = [];
    for (let i = 0; i < x; i++) {
      newArray.push([]);
      for (let j = 0; j < y; j++) {
        newArray[i].push(new Tile());
      }
    }
    return newArray;
  }

  initialiseBoard = () => {
    let mines = 0;
    while (mines < 99) {
      // get random x, y numbers (range 0-99)
      let x = getRandomInt(16),
        y = getRandomInt(30);

      // check that tile for mine
      // if no mine:
      if (this.state.boardArray[x][y].state.value !== "M") {
        mines++;
        let newBoard = this.state.boardArray.slice(0);
        newBoard = this.addMine(newBoard, x, y);
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let row, col;
            if (x + i < 0) {
              row = 0;
            } else if (x + i > 15) {
              row = 15;
            } else {
              row = x + i;
            }
            if (y + j < 0) {
              col = 0;
            } else if (y + j > 29) {
              col = 29;
            } else {
              col = y + j;
            }

            if (newBoard[row][col].state.value !== "M") {
              newBoard[row][col].state.value += 1;
            }
          }
        }
        //   place mine
        this.setState(() => {
          return {
            boardArray: newBoard
          };
        });

        //for all surrounding tiles, if not mine add 1 to value
      }

      // else:
      //   loop again
    }
  };

  addMine(boardArray, x, y) {
    const newBoard = boardArray;
    newBoard[x][y].state.value = "M";
    return newBoard;
  }

  // createBoard():
  //   place 99 random mines
  //   set correct numbers

  // endGame(win/lose):
  //   display board
  //   display win/lose

  render() {
    let keyTest = 0;
    // this.initialiseBoard();
    return (
      <div>
        <button id="button" onClick={this.initialiseBoard}>
          Button
        </button>
        <div id="grid">
          {this.state.boardArray.map(row =>
            row.map(tile => <p key={keyTest++}>{tile.state.value}</p>)
          )}
        </div>
      </div>
    );
  }
}

export default Board;
