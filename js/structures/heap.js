class BaseHeap {
  constructor(compare) {
    this.data = {};
    this.size = 0;
    this.compare = compare;
  }

  insert(value) {
    this.data[this.size] = parseInt(value);
    this.bubbleUp(this.size);
    this.size++;
  }

  remove() {
    if (this.size === 0) return;
    this.data[0] = this.data[this.size - 1];
    delete this.data[this.size - 1];
    this.size--;
    this.bubbleDown(0);
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.data[index], this.data[parent])) {
        [this.data[index], this.data[parent]] = [this.data[parent], this.data[index]];
        index = parent;
      } else break;
    }
  }

  bubbleDown(index) {
    while (index * 2 + 1 < this.size) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let target = index;

      if (left < this.size && this.compare(this.data[left], this.data[target])) target = left;
      if (right < this.size && this.compare(this.data[right], this.data[target])) target = right;

      if (target !== index) {
        [this.data[index], this.data[target]] = [this.data[target], this.data[index]];
        index = target;
      } else break;
    }
  }
  visualize(container) {
    container.innerHTML = "";

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");

    const nodeRadius = 20;
    const levelHeight = 100;
    const levels = Math.floor(Math.log2(this.size)) + 1;
    const svgWidth = Math.max(800, 100 * 2 ** (levels - 1));
    const svgHeight = levels * levelHeight + 50;

    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    const isDark = document.body.classList.contains("dark");
    const strokeColor = isDark ? "#f1c40f" : "#333";
    const fillColor = isDark ? "#2c3e50" : "#fff";
    const textColor = isDark ? "#ecf0f1" : "#000";

    const getPosition = (index) => {
      const level = Math.floor(Math.log2(index + 1));
      const maxNodes = 2 ** level;
      const indexInLevel = index - (2 ** level - 1);
      const xStep = svgWidth / (maxNodes + 1);
      const x = (indexInLevel + 1) * xStep;
      const y = level * levelHeight + 40;
      return { x, y };
    };

    for (let i = 0; i < this.size; i++) {
      const { x, y } = getPosition(i);
      const value = this.data[i];

      if (i !== 0) {
        const parent = Math.floor((i - 1) / 2);
        const { x: px, y: py } = getPosition(parent);

        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", px);
        line.setAttribute("y1", py + nodeRadius);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y - nodeRadius);
        line.setAttribute("stroke", strokeColor);
        svg.appendChild(line);
      }

      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", nodeRadius);
      circle.setAttribute("fill", fillColor);
      circle.setAttribute("stroke", strokeColor);

      // 🪄 Tooltip
      const tooltip = document.createElementNS(svgNS, "title");
      tooltip.textContent = `Index: ${i}\nValue: ${value}`;
      circle.appendChild(tooltip);

      svg.appendChild(circle);

      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y + 5);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "14px");
      text.setAttribute("fill", textColor);
      text.textContent = value;
      svg.appendChild(text);
    }

    container.appendChild(svg);
  }



}
class MaxHeap extends BaseHeap {
  constructor() {
    super((a, b) => a > b);
  }
}

class MinHeap extends BaseHeap {
  constructor() {
    super((a, b) => a < b);
  }
}