import React from "react";
import Tile from "./tile";
import getRandomInt from "../utils/random-number";
// import some funcationality some utils

class Board extends React.Component {
  state = {
    boardArray: this.createBoardArray(16, 30),
    revealedTiles: 0
  };

  createBoardArray(x, y) {
    let newArray = [];
    let id = 0;
    for (let i = 0; i < x; i++) {
      newArray.push([]);
      for (let j = 0; j < y; j++) {
        newArray[i].push({ value: 0, displayed: false, id });
        id++;
      }
    }
    newArray = this.initialiseBoard(newArray);
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
            let row = x + i,
              col = y + j;
            if (row < 0 || row > 15) break;
            if (col < 0 || col > 29) break;
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

  revealZeroNeighbours(newBoardArray, x, y) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let row = x + i,
          col = y + j;
        if (row < 0 || row > 15) break;
        if (col < 0 || col > 29) break;
        if (!newBoardArray[row][col].displayed) {
          newBoardArray[row][col].displayed = true;
          if (newBoardArray[row][col].value == 0) {
            this.revealZeroNeighbours(newBoardArray, row, col);
          }
        }
      }
    }
  }

  revealTile(tileId) {
    this.setState(prevState => {
      const newBoardArray = prevState.boardArray;
      for (let i = 0; i < newBoardArray.length; i++) {
        for (let j = 0; j < newBoardArray[i].length; j++) {
          if (newBoardArray[i][j].id === tileId) {
            newBoardArray[i][j].displayed = true;
            if (newBoardArray[i][j].value == 0) {
              this.revealZeroNeighbours(newBoardArray, i, j);
            }
          }
        }
      }
      return {
        boardArray: newBoardArray,
        revealedTiles: prevState.revealedTiles + 1
      };
    });
  }

  endGame(win) {
    // if (true) {
    this.setState(prevState => {
      prevState.boardArray.forEach(row =>
        row.forEach(tile => {
          tile.displayed = true;
        })
      );
      return {
        boardArray: prevState.boardArray
      };
    });
    // );
    //    reveal everything
    //    add some fun UI
    // } else {
    //    reveal everything
    //    add some anger UI
    // }
  }

  render() {
    return (
      <div id="board">
        <h1>Lose Your MindSweeper </h1>
        <p>
          Try to make it through all exercises of this FAC morning challenge
          without losing your mind in frustration{" "}
        </p>
        <div id="grid">
          {this.state.boardArray.map(row =>
            row.map(tile => (
              <Tile
                value={tile.value}
                displayed={tile.displayed}
                id={tile.id}
                parentBoard={this}
                key={tile.id}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Board;
