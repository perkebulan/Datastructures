class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  insert(value) {
    const node = new Node(value);
    if (!this.head) this.head = node;
    else {
      let temp = this.head;
      while (temp.next) temp = temp.next;
      temp.next = node;
    }
  }
  insertAt(index, value) {
    const node = new Node(value);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
      return;
    }
    let current = this.head, prev = null, i = 0;
    while (current && i < index) {
      prev = current;
      current = current.next;
      i++;
    }
    if (prev) {
      prev.next = node;
      node.next = current;
    }
  }
  remove() {
    if (!this.head) return;
    if (!this.head.next) this.head = null;
    else {
      let temp = this.head;
      while (temp.next.next) temp = temp.next;
      temp.next = null;
    }
  }
  visualize(container) {
    let temp = this.head;
    while (temp) {
      const node = document.createElement("div");
      node.className = "node";
      node.textContent = temp.value;
      container.appendChild(node);

      if (temp.next) {
        const arrow = document.createElement("div");
        arrow.className = "arrow";
        arrow.innerHTML = "→";
        container.appendChild(arrow);
      }

      temp = temp.next;
    }
  }
  }
