let structure = null;
function createStructure() {
  const type = document.getElementById("structure-select").value;
  const size = parseInt(document.getElementById("size").value);
  const container = document.getElementById("visualization");
  container.innerHTML = "";
  switch (type) {
    case "array": structure = new CustomArray(size); break;
    case "linkedlist": structure = new LinkedList(); break;
    case "stack": structure = new Stack(); break;
    case "queue": structure = new Queue(); break;
    case "heap-max":
      structure = new MaxHeap();
      break;
    case "heap-min":
      structure = new MinHeap();
      break;
  }
  render();
}
function updateStructure() {
  const value = document.getElementById("input-value").value;
  const index = parseInt(document.getElementById("input-index").value);
  if (!structure) return;
  if (structure instanceof CustomArray) structure.update(index, value);
  else if (structure instanceof LinkedList) structure.insertAt(index, value);
  render();
}
function addValue() {
  const value = document.getElementById("input-value").value;
  if (!structure) return;
  if (structure.push) structure.push(value);
  else if (structure.enqueue) structure.enqueue(value);
  else if (structure.insert) structure.insert(value);
  render();
}
function removeValue() {
  if (!structure) return;
  if (structure.pop) structure.pop();
  else if (structure.dequeue) structure.dequeue();
  else if (structure.remove) structure.remove();
  render();
}
function render() {
  const container = document.getElementById("visualization");
  container.innerHTML = "";
  structure.visualize(container);
}
function saveToLocalStorage() {
  if (!structure) return;
  const type = document.getElementById("structure-select").value;
  const data = {
    type,
    values: getStructureValues()
  };
  localStorage.setItem("ds-structure", JSON.stringify(data));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem("ds-structure");
  if (!saved) return;
  const parsed = JSON.parse(saved);
  document.getElementById("structure-select").value = parsed.type;
  structure = createStructureFromType(parsed.type, parsed.values);
  render();
}

function getStructureValues() {
  let values = [];
  if (structure instanceof CustomArray) {
    for (let i = 0; i < structure.length; i++) values.push(structure.data[i]);
  } else if (structure instanceof LinkedList) {
    let node = structure.head;
    while (node) {
      values.push(node.value);
      node = node.next;
    }
  } else if (structure instanceof Stack || structure instanceof Queue || structure instanceof MaxHeap) {
    for (let key in structure.data) {
      values.push(structure.data[key]);
    }
  }
  return values;
}

function createStructureFromType(type, values) {
  let s;
  switch (type) {
    case "array":
      s = new CustomArray(0);
      for (let i = 0; i < values.length; i++) s.push(values[i]);
      break;
    case "linkedlist":
      s = new LinkedList();
      for (let v of values) s.insert(v);
      break;
    case "stack":
      s = new Stack();
      for (let v of values) s.push(v);
      break;
    case "queue":
      s = new Queue();
      for (let v of values) s.enqueue(v);
      break;
    case "heap":
      s = new MaxHeap();
      for (let v of values) s.insert(v);
      break;
  }
  return s;
}


window.onload = loadFromLocalStorage;


function render() {
  const container = document.getElementById("visualization");
  container.innerHTML = "";
  structure.visualize(container);
  saveToLocalStorage();
}
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  render();
}


window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});