import Grid from "./Grid.js";
import Queue from "./queue.js";

export class GridModel {
  #grid;

  constructor(rows, cols) {
    this.#grid = new Grid(rows, cols);
    this._rows = rows;
    this._cols = cols;
  }

  rows() {
    return this._rows;
  }

  cols() {
    return this._cols;
  }

  set({ row, col }, value) {
    if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
      this.#grid.set({ row, col }, value);
    }
  }

  get({ row, col }) {
    if (row >= 0 && row < this._rows && col >= 0 && col < this._cols) {
      return this.#grid.get({ row, col });
    }
    return undefined;
  }
}

let modelGrid = null;
export let queue = new Queue();

export function createModelGrid(rows, cols) {
  modelGrid = new GridModel(rows, cols);
  queue.enqueue({ row: 5, col: 5 });
  console.log(modelGrid);
}

export function getModel() {
  return modelGrid;
}

export function readFromCell(row, col) {
  return modelGrid ? modelGrid.get({ row, col }) : 0;
}

export function writeToCell({ row, col }, value) {
  if (modelGrid) {
    modelGrid.set({ row, col }, value);
  }
}

export function addFood() {
  //TODO WRITE
   
  // const rows = modelGrid.rows();
  // const cols = modelGrid.cols();
  
  // let randomRow = Math.floor(Math.random() * rows);
  // let randomCol = Math.floor(Math.random() * cols);
  
  // modelGrid.set({ row: randomRow, col: randomCol }, 2);
}
