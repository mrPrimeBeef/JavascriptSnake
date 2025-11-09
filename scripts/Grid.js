export default class Grid {
  #arr;

  constructor(rows, cols) {
    this.#arr = Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  set({ row, col }, value) {
    if (this.check({ row, col }) === undefined) {
      this.#arr[row][col] = value;
    }
  }

  get({ row, col }) {
    return this.#arr[row][col];
  }

  indexFor({ row, col }) {
    return row * this.#arr[0].length + col;
  }

  rowColFor(index) {
    let row = Math.floor(index / this.#arr[0].length);
    let col = index % this.#arr[0].length;

    return { row, col };
  }

  north({ row, col }) {
    if (row - 1 < 0) {
      return undefined;
    }
    const value = this.#arr[row - 1][col];
    return { row: row - 1, col, value };
  }

  northwest({ row, col }) {
    if (row - 1 < 0 || col - 1 < 0) {
      return undefined;
    }
    const value = this.#arr[row - 1][col - 1];
    return { row: row - 1, col: col - 1, value };
  }

  northeast({ row, col }) {
    if (row - 1 < 0 || col + 1 >= this.#arr[0].length) {
      return undefined;
    }
    const value = this.#arr[row - 1][col + 1];
    return { row: row - 1, col: col + 1, value };
  }

  south({ row, col }) {
    if (row + 1 >= this.#arr.length) {
      return undefined;
    }
    const value = this.#arr[row + 1][col];
    return { row: row + 1, col, value };
  }
  southwest({ row, col }) {
    if (row + 1 >= this.#arr.length || col - 1 < 0) {
      return undefined;
    }
    const value = this.#arr[row + 1][col - 1];
    return { row: row + 1, col: col - 1, value };
  }

  southeast({ row, col }) {
    if (row + 1 >= this.#arr.length || col + 1 >= this.#arr[0].length) {
      return undefined;
    }
    const value = this.#arr[row + 1][col + 1];
    return { row: row + 1, col: col + 1, value };
  }

  west({ row, col }) {
    if (col - 1 < 0) {
      return undefined;
    }
    const value = this.#arr[row][col - 1];
    return { row, col: col - 1, value };
  }

  east({ row, col }) {
    if (col + 1 >= this.#arr[0].length) {
      return undefined;
    }
    const value = this.#arr[row][col + 1];
    return { row, col: col + 1, value };
  }

  neighbourValues({ row, col }) {
    const neighbours = this.neighbours({ row, col });
    return neighbours.map((neighbour) => neighbour.value);
  }

  neighbours({ row, col }) {
    let listOfNeighbours = [];

    const northNeighbour = this.north({ row, col });
    if (northNeighbour !== undefined) {
      listOfNeighbours.push(northNeighbour);
    }

    const southNeighbour = this.south({ row, col });
    if (southNeighbour !== undefined) {
      listOfNeighbours.push(southNeighbour);
    }

    const westNeighbour = this.west({ row, col });
    if (westNeighbour !== undefined) {
      listOfNeighbours.push(westNeighbour);
    }

    const eastNeighbour = this.east({ row, col });
    if (eastNeighbour !== undefined) {
      listOfNeighbours.push(eastNeighbour);
    }

    const northwestNeighbour = this.northwest({ row, col });
    if (northwestNeighbour !== undefined) {
      listOfNeighbours.push(northwestNeighbour);
    }

    const northeastNeighbour = this.northeast({ row, col });
    if (northeastNeighbour !== undefined) {
      listOfNeighbours.push(northeastNeighbour);
    }

    const southwestNeighbour = this.southwest({ row, col });
    if (southwestNeighbour !== undefined) {
      listOfNeighbours.push(southwestNeighbour);
    }

    const southeastNeighbour = this.southeast({ row, col });
    if (southeastNeighbour !== undefined) {
      listOfNeighbours.push(southeastNeighbour);
    }

    return listOfNeighbours;
  }

  rows() {
    return this.#arr.length;
  }

  cols() {
    return this.#arr[0].length;
  }

  size() {
    return this.rows() * this.cols();
  }

  fill(value) {
    const v = this.get({ row, col }) ? 0 : 1;
    this.set({ row, col }, v);
  }

  check({ row, col }) {
    if (
      row < 0 ||
      row >= this.#arr.length ||
      col >= this.#arr[0].length ||
      col < 0
    ) {
      return undefined;
    }
  }

  updateGrid(newArray) {
  this.#arr = newArray;
}
}
