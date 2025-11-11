import * as controller from "./controller.js";

let simulationInterval = null;

export function makeGrid() {
  const grid = document.getElementById("grid");
  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("cols");
  const generateBtn = document.getElementById("generate");

  generateBtn.addEventListener("click", () => {
    const rows = parseInt(rowsInput.value, 10);
    const cols = parseInt(colsInput.value, 10);

    controller.createGrid(rows, cols);

    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 20px)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        grid.appendChild(cell);
      }
    }
    renderGrid();
    controller.addFood();
    controller.startGame();
  });
}

export function renderGrid() {
  const cells = document.querySelectorAll(".cell");
  const modelGrid = controller.getGrid();

  cells.forEach((cell, index) => {
    const rows = modelGrid.rows();
    const row = Math.floor(index / modelGrid.cols());
    const col = index % modelGrid.cols();

    const value = modelGrid.get({ row, col });

    switch (value) {
      case 0:
        cell.classList.remove("player", "goal");
        break;
      case 1:
        cell.classList.add("player");
        break;
      case 2:
        cell.classList.add("goal");
        break;
    }
  });
}
