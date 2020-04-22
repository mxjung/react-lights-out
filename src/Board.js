import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let rows = [];
      for (let j = 0; j < ncols; j++) {
        if (Math.random() < chanceLightStartsOn) {
          rows.push(true);
        } else {
          rows.push(false);
        }
      }
      initialBoard.push(rows);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(col => col === false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepCopy = oldBoard.map(row => ([...row])); // use map to spread out the arrays within the arrays

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, deepCopy);
      flipCell(y + 1, x, deepCopy);
      flipCell(y - 1, x, deepCopy);
      flipCell(y, x + 1, deepCopy);
      flipCell(y, x - 1, deepCopy);

      // ******** are we mutating the row arrays inside flipCell? 

      // TODO: return the copy
      return deepCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return (
      <div>
        <h2>You've Won!</h2>
      </div>
    )
  }

  // make table board
  return (
    <section className="Board">
      <table>
        <tbody>
          {board.map((row, rowIdx) =>
            (<tr key={`${rowIdx}`}>
              {row.map((col, colIdx) =>
                (<Cell
                  flipCellsAroundMe={() => flipCellsAround(`${rowIdx}-${colIdx}`)}
                  isLit={board[rowIdx][colIdx]}
                  key={`${rowIdx}-${colIdx}`}
                />))}
            </tr>)
          )}
        </tbody>
      </table>
    </section>
  )
  // TODO
}

export default Board;
