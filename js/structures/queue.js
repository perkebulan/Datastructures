class Queue {
  constructor() {
    this.data = {};
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.data[this.rear] = value;
    this.rear++;
  }
  dequeue() {
    if (this.front < this.rear) {
      delete this.data[this.front];
      this.front++;
    }
  }
  visualize(container) {
    for (let i = this.front; i < this.rear; i++) {
      const node = document.createElement("div");
      node.className = "node";
      node.textContent = this.data[i];
      container.appendChild(node);
    }
  }
}