class Stack {
  constructor() {
    this.data = {};
    this.top = -1;
  }
  push(value) {
    this.top++;
    this.data[this.top] = value;
  }
  pop() {
    if (this.top >= 0) {
      delete this.data[this.top];
      this.top--;
    }
  }
  visualize(container) {
    for (let i = this.top; i >= 0; i--) {
      const node = document.createElement("div");
      node.className = "node";
      node.textContent = this.data[i];
      container.appendChild(node);
    }
  }
}