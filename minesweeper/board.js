import React from "react";
import Tile from "./tile";
import cloneBoard from "../utils/clone-board";
import getRandomInt from "../utils/random-number";
// import some funcationality some utils

class Board extends React.Component {
  state = {
    boardArray: this.createBoard(16, 30),
    revealedTiles: 0
  };

  createBoard(x, y) {
    let board = [];
    let id = 0;
    for (let i = 0; i < x; i++) {
      board.push([]);
      for (let j = 0; j < y; j++) {
        board[i].push({ value: 0, displayed: false, id });
        id++;
      }
    }
    return this.initialiseBoard(board);
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
            if (row >= 0 && row < 16 && col >= 0 && col < 30) {
              if (board[row][col].value !== "M") {
                board[row][col].value += 1;
              }
            }
          }
        }
      }
    }
    return board;
  }

  addMine(board, x, y) {
    const newBoard = cloneBoard(board);
    newBoard[x][y].value = "M";
    return newBoard;
  }

  revealZeroNeighbours(board, x, y) {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let row = x + i,
          col = y + j;
        if (row >= 0 && row < 16 && col >= 0 && col < 30) {
          if (!board[row][col].displayed) {
            board[row][col].displayed = true;
            if (board[row][col].value == 0) {
              this.revealZeroNeighbours(board, row, col);
            }
          }
        }
      }
    }
  }

  revealTile(tileId) {
    this.setState(prevState => {
      const board = prevState.boardArray.map(row =>
        row.map(tile => ({
          value: tile.value,
          displayed: tile.displayed,
          id: tile.id
        }))
      );
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j].id === tileId) {
            board[i][j].displayed = true;
            if (board[i][j].value == 0) {
              this.revealZeroNeighbours(board, i, j);
            }
          }
        }
      }
      return {
        boardArray: board,
        revealedTiles: prevState.revealedTiles + 1
      };
    });
  }

  endGame(win) {
    // if (true) {
    this.setState(prevState => {
      const endGameBoard = prevState.boardArray.map(row =>
        row.map(tile => ({ value: tile.value, displayed: true, id: tile.id }))
      );
      return {
        boardArray: endGameBoard
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
