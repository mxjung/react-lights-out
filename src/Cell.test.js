import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cell from './Cell';

let container;
beforeEach(function () {
  let tr = document.createElement("tr");
  container = document.body.appendChild(tr);
})

it("renders without Crashing", function () {
  let tr = document.createElement("tr");
  let container = document.body.appendChild(tr);
  render(<Cell />, { container })
})