class CustomArray {
  constructor(size) {
    this.size = size;
    this.length = 0;
    this.data = {};
    for (let i = 0; i < size; i++) {
      this.data[i] = 0;
      this.length++;
    }
  }
  update(index, value) {
    if (index >= 0 && index < this.length) this.data[index] = value;
  }
  push(value) {
    this.data[this.length] = value;
    this.length++;
  }
  pop() {
    if (this.length > 0) {
      delete this.data[this.length - 1];
      this.length--;
    }
  }
  visualize(container) {
    const wrapper = document.createElement("div");
    wrapper.className = "array-wrapper";

    for (let i = 0; i < this.length; i++) {
      const cell = document.createElement("div");
      cell.className = "array-cell";

      const value = document.createElement("div");
      value.className = "node";
      value.textContent = this.data[i];

      const index = document.createElement("div");
      index.className = "index-label";
      index.textContent = i;

      cell.appendChild(value);
      cell.appendChild(index);
      wrapper.appendChild(cell);
    }

    container.appendChild(wrapper);
  }
}