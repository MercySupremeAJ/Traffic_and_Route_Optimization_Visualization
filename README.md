# 🚦 Traffic & Route Optimization Visualizer

> **An interactive algorithm visualization platform that transforms abstract computer science algorithms into real-world traffic and route optimization simulations.**

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🧠 Overview

This project bridges the gap between **theoretical algorithms** and **practical real-world applications** by visualizing:

- **Sorting algorithms** as traffic flow optimization (vehicles bubbling, merging, partitioning)
- **Graph traversal algorithms** as route navigation across a city map (intersections, roads, traffic conditions)

Instead of traditional bar charts in isolation, users see algorithms operating in a **city-based simulation model** where:
- 🟢 **Nodes** = Intersections (Stadium, Hospital, Tech Park, etc.)
- 🔵 **Edges** = Roads connecting locations
- 🟡 **Weights** = Traffic congestion levels (1–9)

---

## ✨ Features

### 🔹 7 Algorithm Simulations
| Algorithm | Category | Traffic Metaphor |
|-----------|----------|-----------------|
| **Bubble Sort** | Sorting | Traffic Prioritization — vehicles bubble up by priority |
| **Merge Sort** | Sorting | Traffic Redistribution — divide into lanes, merge efficiently |
| **Quick Sort** | Sorting | Route Optimization — pivot intersection directs traffic |
| **Binary Search** | Searching | Location Search — GPS-like narrowing down |
| **BFS** | Graph | Layer-by-Layer Road Traversal — explore like ripples |
| **DFS** | Graph | Deep Road Exploration — one path until dead end |
| **Dijkstra** | Graph | Shortest Path Navigation — the GPS of algorithms |

### 🔹 Dual Visualization Modes
- **📊 Bar View** — Classic bar chart with color-coded states (comparing, swapping, sorted, pivot)
- **🗺️ Graph View** — SVG city map with labeled intersections, weighted roads, and animated path tracing

### 🔹 Interactive Controls
- ▶ Play / ⏸ Pause / ↺ Reset / ⏭ Step Forward / ⏮ Step Back
- ⚡ Adjustable speed slider (Lightning → Detailed)
- 📏 Data size slider (6–40 elements)
- ⌨️ Keyboard shortcuts: `Space` = Play/Pause, `← →` = Step, `R` = Reset

### 🔹 Learning Enhancements
- 📝 **Pseudocode Viewer** — Toggle between English, JavaScript, and Python with active line highlighting
- 📊 **Complexity Display** — Color-coded badges for Best/Avg/Worst time + space complexity
- 🎨 **Dynamic Legend** — Adapts to the current algorithm and view mode
- ⚔️ **Side-by-Side Comparison** — Run two algorithms simultaneously on the same data

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework with functional components & hooks |
| **Vite 8** | Build tool & dev server |
| **CSS3** | Custom design system with CSS variables, glassmorphism |
| **SVG** | Graph visualization (no D3/canvas dependencies) |
| **useReducer** | Animation state machine (IDLE → RUNNING → PAUSED → COMPLETE) |

### Key Architecture Decisions
1. **Precomputed Steps** — All algorithm steps generated before animation starts for smooth playback
2. **State Machine** — `useReducer` manages animation lifecycle with predictable transitions
3. **Modular Algorithms** — Each algorithm is an independent module returning step arrays
4. **Zero External Dependencies** — Pure React + CSS + SVG for maximum simplicity

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/MercySupremeAJ/Traffic_and_Route_Optimization_Visualization.git

# Navigate to project directory
cd Traffic_and_Route_Optimization_Visualization

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
src/
├── algorithms/              # Pure algorithm step generators
│   ├── sorting/             # Bubble Sort, Merge Sort, Quick Sort
│   ├── searching/           # Binary Search
│   ├── graph/               # BFS, DFS, Dijkstra
│   └── metadata.js          # Complexity info, pseudocode, descriptions
├── hooks/
│   ├── useAlgorithm.js      # Animation state machine (useReducer)
│   └── useGraphData.js      # City graph state management
├── utils/
│   ├── arrayGenerator.js    # Random/sorted array generation
│   └── graphGenerator.js    # Connected city graph generation
├── components/
│   ├── Header.jsx           # App header with animated traffic light
│   ├── ControlPanel.jsx     # Algorithm selector + transport controls
│   ├── BarView.jsx          # Bar chart visualization
│   ├── GraphView.jsx        # SVG city map visualization
│   ├── ComparisonView.jsx   # Side-by-side algorithm comparison
│   ├── PseudocodeViewer.jsx # Multi-language pseudocode display
│   ├── ComplexityDisplay.jsx # Time/space complexity badges
│   ├── InfoPanel.jsx        # Right sidebar container
│   └── Legend.jsx           # Dynamic color legend
├── App.jsx                  # Root orchestrator
├── App.css                  # Layout styles
├── index.css                # Design system & global styles
└── main.jsx                 # Entry point
```

---

## 🎨 Design System

The app uses a **dark cyberpunk/neon traffic theme** with:
- 🌑 Deep navy backgrounds (#0a0e1a, #121829)
- 💠 Neon cyan accents (#00e5ff)
- 💜 Magenta highlights (#ff006e)
- 🟡 Traffic amber (#ffb700)
- 🟢 Go green (#00e676)
- 🔴 Stop red (#ff1744)
- Glassmorphism panels with backdrop blur
- Micro-animations (pulse, glow, swap flash)
- Google Fonts: Inter, JetBrains Mono, Outfit

---

## 📈 Future Improvements

- 🗺️ Integration with real map APIs (OpenStreetMap, Google Maps)
- 🤖 AI-based traffic prediction
- 🏙️ 3D visualization of city models
- 📱 Mobile-optimized responsive design
- 🎓 Tutorial mode with guided walkthroughs
- 📊 Performance benchmarking dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-algorithm`)
3. Commit changes (`git commit -m 'Add new algorithm'`)
4. Push to branch (`git push origin feature/new-algorithm`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by MercySupremeAJ**
