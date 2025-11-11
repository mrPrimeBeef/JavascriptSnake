import * as model from "./model.js";
import * as view from "./view.js";

let direction = "left";
let points = -1;
let tickTimeout;

function startController() {
  view.makeGrid();

  document.addEventListener("keydown", keyPress);
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

function lose() {
  console.log("Get good");
  alert(`Game Over!\nFinal Score: ${points}`);
  clear();
}

function clear() {
  clearTimeout(tickTimeout);
  direction = "left";
  points = 0;
  tickTimeout = null;
  model.queue.clear();
  view.updateHUD(0);
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
}

function tick() {
   tickTimeout = setTimeout(tick, 200);

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

  current = model.queue.head;
  let losecondition = false;

  while (current) {
    if (current.data.row === head.row && current.data.col === head.col) {
      losecondition = true;
      break;
    }
    current = current.next;
  }

  if (losecondition) {
    lose();
    return;
  }

  if (model.getModel().get({ row: head.row, col: head.col }) === 2) {
    addFood();
  } else {
    model.queue.dequeue();
  }

  model.queue.enqueue(head);

  current = model.queue.head;
  while (current) {
    model.writeToCell({ row: current.data.row, col: current.data.col }, 1);
    current = current.next;
  }

  view.renderGrid();
}

export function addFood() {
  points++;
  model.addFood();
  view.updateHUD(points);
}

startController();
