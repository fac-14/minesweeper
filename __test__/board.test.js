/* eslint-disable */

import Board from "../minesweeper/board";
import Tile from "../minesweeper/tile";

describe("Testing Board properties and methods", () => {
  const testBoard = new Board();
  test("createBoardArray() creates an empty array of set dimensions", () => {
    expect(Array.isArray(testBoard.createBoardArray(16, 30))).toBeTruthy();
    expect(testBoard.createBoardArray(16, 30).length).toBe(16);
    expect(testBoard.createBoardArray(16, 30)[0].length).toBe(30);
  });
  test("new Board is instantiated with boardArray property", () => {
    expect(testBoard.state.boardArray.length).toBe(16);
    expect(testBoard.state.boardArray[0].length).toBe(30);
    expect(testBoard.state.boardArray[0][0] instanceof Object).toBeTruthy();
  });
});
