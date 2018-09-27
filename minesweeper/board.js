import React from "react";
import Tile from "./tile";
import getRandomInt from "../utils/random-number";
// import some funcationality some utils

class Board extends React.Component {
  state = {
    boardArray: this.createBoardArray(16, 30)
  };

  createBoardArray(x, y) {
    let newArray = [];
    for (let i = 0; i < x; i++) {
      newArray.push([]);
      for (let j = 0; j < y; j++) {
        newArray[i].push({ value: 0, displayed: false });
      }
    }
    newArray = this.initialiseBoard(newArray);
    // console.log(newArray);
    return newArray;
  }

  initialiseBoard(board) {
    let mines = 0;
    while (mines < 99) {
      let x = getRandomInt(16),
        y = getRandomInt(30);
      if (board[x][y].value !== "M") {
        mines++;
        board = this.addMine(board, x, y);
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            let row = x + i;
            if (row < 0 || row > 15) break;
            row = row < 0 ? 0 : row;
            row = row > 15 ? 15 : row;
            let col = y + j;
            if (col < 0 || col > 29) break;
            col = col < 0 ? 0 : col;
            col = col > 29 ? 29 : col;
            if (board[row][col].value !== "M") {
              board[row][col].value += 1;
            }
          }
        }
      }
    }
    return board;
  }

  addMine(boardArray, x, y) {
    const newBoard = boardArray;
    newBoard[x][y].value = "M";
    return newBoard;
  }

  // endGame(win):
  //  if (win)
  //    reveal everything
  //    add some fun UI
  //  else
  //    reveal everything
  //    add some anger UI

  render() {
    let keyTest = 0;
    return (
      <div>
        <div id="grid">
          {this.state.boardArray.map(row =>
            row.map(tile => (
              <Tile
                value={tile.value}
                displayed={tile.displayed}
                key={keyTest++}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Board;
