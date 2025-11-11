export default class Queue {
  head;
  tail;
  #size;

  constructor() {
    this.head = null;
    this.tail = null;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  enqueue(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      this.#size++;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.#size++;
  }

  peek() {
    return this.head ? this.head.data : null;
  }

  getLastNode() {
    return this.tail;
  }

  get(index) {
    const node = this.getNode(index);
    return node;
  }

  getNode(index) {
    if (index < 0 || index >= this.#size) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  dequeue() {
    if (this.head === null) {
      return null;
    }
    const removalNode = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }
    this.#size--;
    return removalNode;
  }

  clear() {
    this.#size = 0;
    this.head = null;
    this.tail = null;
  }
}

function Node(data) {
  return {
    data: data,
    next: null,
  };
}
