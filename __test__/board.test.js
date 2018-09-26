/* eslint-disable */

import Board from "../minesweeper/board";

describe("Testing Board properties and methods", () => {
  const testBoard = new Board();
  test("createBoardArray() creates an empty array of set dimensions", () => {
    expect(Array.isArray(testBoard.createBoardArray(10, 10))).toBeTruthy();
    expect(testBoard.createBoardArray(10, 10).length).toBe(10);
    expect(testBoard.createBoardArray(10, 10)[0].length).toBe(10);
  });
  test("new Board is instantiated with boardArray property", () => {
    expect(testBoard.state.boardArray.length).toBe(16);
    expect(testBoard.state.boardArray[0].length).toBe(30);
    expect(testBoard.state.boardArray[0][0]).toBe(undefined);
  });
});
