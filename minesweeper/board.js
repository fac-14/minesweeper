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
      let x = getRandomInt(16),
        y = getRandomInt(30);
      if (this.state.boardArray[x][y].state.value !== "M") {
        mines++;
        let newBoard = this.state.boardArray.slice(0);
        newBoard = this.addMine(newBoard, x, y);
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let row = x + i;
            row = row < 0 ? 0 : row;
            row = row > 15 ? 15 : row;
            let col = y + j;
            col = col < 0 ? 0 : col;
            col = col > 29 ? 29 : col;
            if (newBoard[row][col].state.value !== "M") {
              newBoard[row][col].state.value += 1;
            }
          }
        }
        this.setState(() => {
          return {
            boardArray: newBoard
          };
        });
      }
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
