/* eslint-disable */

import getRandomInt from "../utils/random-number";

test("test random integer generator", () => {
  for (let i = 0; i < 10; i++) {
    expect(getRandomInt(10) >= 0).toBeTruthy;
    expect(getRandomInt(10) < 10).toBeTruthy;
  }
});
