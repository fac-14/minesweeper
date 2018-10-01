import React from "react";
import Tile from "./tile";
import cloneBoard from "../utils/clone-board";
import getRandomInt from "../utils/random-number";
import getSurroundingTiles from "../utils/get-surrounding-tiles";

class Board extends React.Component {
  state = {
    boardWidth: 30,
    boardHeight: 16,
    difficulty: null,
    board: this.createBoard(30, 16),
    revealedTiles: 0
  };

  createBoard(width, height) {
    let board = [];
    for (let i = 0; i < width * height; i++) {
      board.push({ value: 0, displayed: false, marked: false });
    }
    return this.initialiseBoard(board, width, height);
  }

  initialiseBoard(board, width, height) {
    let mines = 0;
    while (mines < 99) {
      let tile = getRandomInt(width * height);
      if (board[tile].value !== "M") {
        mines++;
        board = this.addMine(board, tile);
        const surroundingTiles = getSurroundingTiles(tile, width);
        surroundingTiles.forEach(tile => {
          if (tile > 0 && tile < width * height) {
            if (board[tile].value !== "M") {
              board[tile].value += 1;
            }
          }
        });
      }
    }
    return board;
  }

  addMine(board, tile) {
    const newBoard = cloneBoard(board);
    newBoard[tile].value = "M";
    return newBoard;
  }

  revealZeroNeighbours(board, tile) {
    const surroundingTiles = getSurroundingTiles(tile, this.state.boardWidth);
    surroundingTiles.forEach(tile => {
      if (tile > 0 && tile < this.state.boardWidth * this.state.boardHeight) {
        if (!board[tile].displayed) {
          board[tile].displayed = true;
          board[tile].marked = false;
          if (board[tile].value == 0) {
            this.revealZeroNeighbours(board, tile);
          }
        }
      }
    });
  }

  revealTile(tile) {
    this.setState(prevState => {
      const board = cloneBoard(prevState.board);
      board[tile].displayed = true;
      board[tile].marked = false;
      if (board[tile].value == 0) {
        this.revealZeroNeighbours(board, tile);
      }
      return {
        board,
        revealedTiles: prevState.revealedTiles + 1
      };
    });
  }

  markTile(tile) {
    this.setState(prevState => {
      const board = cloneBoard(prevState.board);
      board[tile].marked = !board[tile].marked;
      return {
        board
      };
    });
  }

  endGame(win) {
    if (win) {
      this.setState(prevState => {
        const endGameBoard = prevState.board.map(tile => ({
          value: tile.value,
          displayed: true,
          id: tile.id,
          marked: false
        }));
        return {
          board: endGameBoard
        };
      });
      //    add some fun UI
    } else {
      this.setState(prevState => {
        const endGameBoard = prevState.board.map(tile => ({
          value: tile.value,
          displayed: tile.value == "M" ? true : tile.displayed,
          id: tile.id,
          marked: false
        }));
        return {
          board: endGameBoard
        };
      });
      //    add some anger UI
    }
  }

  render() {
    return (
      <div id="board">
        <div id="board--header">
          <h1>Lose Your MindSweeper </h1>
          <p>
            Try to make it through all exercises of this FAC morning challenge
            without losing your mind in frustration
          </p>
        </div>
        <div id="grid">
          {this.state.board.map((tile, index) => (
            <Tile
              value={tile.value}
              displayed={tile.displayed}
              marked={tile.marked}
              id={index}
              parentBoard={this}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
