import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

it("renders without Crashing", function () {
  render(<Board nrows={1} ncols={1} chanceLightStartsOn={1} />)
})

it("matches snapshot", function () {
  const { asFragment } = render(<Board nrows={1} ncols={1} chanceLightStartsOn={1} />);
  expect(asFragment()).toMatchSnapshot();
})

it("Checks for Win", function () {
  const { container } = render(<Board nrows={1} ncols={1} chanceLightStartsOn={1} />);
  const cell = container.querySelector("td");

  // click cell
  fireEvent.click(cell);

  const newCell = container.querySelector("td");
  expect(newCell).toBe(null);
})

it("Checks for Correct light switch", function () {
  const { getAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
  const cells = getAllByRole('button');

  // look into getByAttribute for grabbing all elements with equivalent class

  // Fire event the middle button
  fireEvent.click(cells[4]);

  let cellsChanged = [1, 3, 4, 5, 7];
  cells.forEach((cell, idx) => {
    if (cellsChanged.includes(idx)) {
      expect(cell).not.toHaveClass('Cell-lit');
    } else {
      expect(cell).toHaveClass('Cell-lit');
    }
  })
})