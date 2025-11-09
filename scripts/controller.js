import * as model from "./model.js";
import * as view from "./view.js";

let direction = "left";

function startController() {
  view.makeGrid();

  document.addEventListener("keydown", keyPress);

  tick();
}

export function createGrid(rows, cols) {
  return model.createModelGrid(rows, cols);
}

export function getGrid() {
  return model.getModel();
}

export function startGame() {
  tick();
}

function keyPress(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;

    case "ArrowRight":
    case "d":
      direction = "right";
      break;

    case "ArrowUp":
    case "w":
      direction = "up";
      break;

    case "ArrowDown":
    case "s":
      direction = "down";
      break;
  }
}

function tick() {
  setTimeout(tick, 500);

  let current = model.queue.head;
  while (current) {
    model.writeToCell({ row: current.data.row, col: current.data.col }, 0);
    current = current.next;
  }

  const lastNode = model.queue.getLastNode();
  const head = {
    row: lastNode.data.row,
    col: lastNode.data.col,
  };

  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = model.getModel().cols();
      }
      break;

    case "right":
      head.col++;
      if (head.col > model.getModel().cols()) {
        head.col = 0;
      }
      break;

    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = model.getModel().rows();
      }
      break;

    case "down":
      head.row++;
      if (head.row > model.getModel().rows()) {
        head.row = 0;
      }
      break;
  }
  
  if (model.getModel().get({ row: head.row, col: head.col }) === 2) {
    model.queue.enqueue(head);
  }

  //TODO HERE
  let hitSelf = false;
  while (current) {
    if (current.data.row === head.row && current.data.col === head.col) {
      hitSelf = true;
      break;
    }
    current = current.next;
  }

  current = model.queue.head;
  while (current) {
    model.writeToCell({ row: current.data.row, col: current.data.col }, 1);
    current = current.next;
  }

  model.queue.enqueue(head);
  model.queue.dequeue();

  //TODO HERE
  model.addFood();

  view.renderGrid();
}

startController();
