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
    // while (mines < 99) {
    // get random x, y numbers (range 0-99)
    let x = getRandomInt(16),
      y = getRandomInt(30);

    return this.setState(prevState => {
      const newBoardArray = prevState.boardArray;
      console.log(newBoardArray[x][y]);
      newBoardArray[x][y].state.value = "X";
      return {
        boardArray: newBoardArray
      };
    });
    // check that tile for mine
    // // if no mine:
    // if (this.state.boardArray[x][y].state.value !== "M") {
    //   mines++;
    //   //   place mine
    //   this.setState(prevState => {
    //     const newBoardArray = this.addMine(prevState.boardArray, x, y);
    //     console.log(newBoardArray);
    //     // return {
    //     //   boardArray: newBoardArray
    //     // };
    //   });
    //   for all surrounding tiles, if not mine add 1 to value
    // }

    // else:
    //   loop again
    // }
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
