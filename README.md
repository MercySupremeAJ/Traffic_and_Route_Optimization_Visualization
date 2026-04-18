# 🚦 Traffic & Route Optimization Visualizer

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite)
![Architecture](https://img.shields.io/badge/Architecture-State_Machine-magenta?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A high-performance algorithmic visualizer simulating real-world urban mobility and route optimization logic, architected directly in React 19 without external charting dependencies. The visualization layer integrates a functional abstraction mapping theoretical algorithms to randomized urban intersection networks (contextualized in Lagos, Nigeria).

---

## 🏗 System Architecture

The application is engineered around a deterministic state-machine abstraction. Rather than tightly coupling rendering loops with algorithm execution, the architecture decouples logical computation from visual interpretation.

### 1. Pre-computation Execution Engine
Executing O(n²) or recursive functions concurrently with React state updates results in severe thread blocking and render stutter. 

Instead of yielding within a sorting loop, algorithms (pure functions) execute synchronously in milliseconds. During execution, they push immutable state snapshots onto a contiguous heap array mapping every single comparison, swap, distance relaxation, and queue shift.
```javascript
// Example Snapshot Output
steps.push({
    array: [...currentArrayState], // Instance state
    comparing: [i, j],             // Active pointers
    statusDelta: "Comparing traffic loads"
});
```
The React layer then acts strictly as a "video player" consuming this dataset via a centralized temporal index pointer.

### 2. State Machine (`useReducer` Hook)
The animation lifecycle is governed by a `useReducer` hook maintaining atomic, predictable transitions.
* **IDLE:** Data is loaded; temporal pointer is at 0.
* **RUNNING:** `useEffect` spawns a `setInterval` tracking `stepIndex++`. A `useRef` retains the interval pointer for instant garbage collection on interrupts.
* **PAUSED:** Interval is destroyed; temporal state freeze.
* **COMPLETE:** Temporal pointer equals snapshot array length; metrics finalized.

### 3. SVG vs Canvas DOM Layering
For the Graph Network (City Map), we utilize direct SVG injection rather than HTML5 `<canvas>`.
* **Why SVG?** Nodes (`<circle>`) and edges (`<line>`) exist natively in the DOM. This strictly isolates styling concerns; instead of complex canvas redraws on tick, we simply mutate `className` bindings directly from the state step.
* Heavy CSS optimization (e.g., `<feGaussianBlur>` filters for Route Selection glowing) is handled by the GPU asynchronously rather than polluting the JS runtime.

---

## 🧠 Algorithmic Implementations

The engine supports 7 independent algorithms mapped across two distinct rendering planes.

### Plane A: Sorting Visualization (Bar View)
Metaphor: *Traffic Prioritization and Lane Redistributing*
* **Bubble Sort** (O(n²)): Analyzed for basic adjacent memory pointer transitions.
* **Merge Sort** (O(n log n)): Visualizes recursive divide-and-conquer sub-array unrolling. 
* **Quick Sort** (O(n log n)): Implements a high-partition logic, bounding values over a chosen pivot.

### Plane B: Graph Traversal (City Map View)
Metaphor: *GPS Network Analysis across Intersections (Nodes) and Road Congestion Constraints (Edge Weights).*
* **Breadth-First Search (BFS):** Strict Queue (FIFO) logic mapping unweighted layer-by-layer radial expansion.
* **Depth-First Search (DFS):** Stack (LIFO) behavior running deep pathing traces into dead-ends before initiating localized backtracking.
* **Dijkstra's Algorithm:** Priority Queue-driven weighted graph evaluation. Constantly mapping optimal deltas from Source to Vertex, illustrating dynamic "edge relaxation" whenever a structurally faster route mitigates heavy traffic metrics.

---

## 🛠 Feature Specifications

* **Side-by-Side Concurrency Pipeline:** Instantiating the `useAlgorithm` engine hook twice allows asynchronous execution of two wholly independent algorithmic variants on a shared data heap for direct performance benchmarking.
* **Metadata Parsing & Reflection:** A centralized JSON-style object exposes O-notation constants and implementation pseudocode arrays across Python, JS, C, and raw English bindings.
* **Time Complexity Scaling:** User-driven DOM throttler (Speed Slider) scales interval delays recursively down to 50ms (Lightning logic trace) scaling dynamically scaling up to 1000ms (Frame-by-frame debug trace).

---

## 🚀 Setup & Initialization

### Requirements
- Node.js environment (v18+)

### Pipeline
```bash
# Clone the repository
git clone https://github.com/MercySupremeAJ/Traffic_and_Route_Optimization_Visualization.git

# Navigate and install
cd Traffic_and_Route_Optimization_Visualization
npm install

# Initialize development instance
npm run dev
```

Server compiles via Vite and mounts on `http://localhost:5173`. 

### Production Compilation
```bash
npm run build
npm run preview
```
Yields a massively minified static asset bundle optimized for low latency mounting.

---

## 📁 Core Directory Map

```text
src/
├── algorithms/              # Independent logical execution matrices
│   ├── sorting/             # Array mutation snapshots
│   ├── graph/               # Matrix queue/stack snapshot traces
│   └── metadata.js          # Shared memory constants & Pseudo Registry
├── hooks/
│   ├── useAlgorithm.js      # Primary State Machine
│   └── useGraphData.js      # Graph Network randomized generator mapped to Lagos Points
├── components/              # View layer integrations 
│   ├── ComparisonView.jsx   # Concurrent split-DOM wrapper
│   ├── GraphView.jsx        # Direct SVG DOM injector
│   └── PseudocodeViewer.jsx # Live-line code tracker
└── App.jsx                  # Master Orchestrator Component
```

---

*Architected and Engineered by **MercySupremeAJ***
