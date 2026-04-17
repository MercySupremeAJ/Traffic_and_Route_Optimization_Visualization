import { useState, useCallback, useEffect, useMemo } from 'react';
import { useAlgorithm } from './hooks/useAlgorithm';
import { useGraphData } from './hooks/useGraphData';
import { ALGORITHMS } from './algorithms/metadata';
import { generateRandomArray, generateSortedArray, pickSearchTarget } from './utils/arrayGenerator';
import { generateBubbleSortSteps } from './algorithms/sorting/bubbleSort';
import { generateMergeSortSteps } from './algorithms/sorting/mergeSort';
import { generateQuickSortSteps } from './algorithms/sorting/quickSort';
import { generateBinarySearchSteps } from './algorithms/searching/binarySearch';
import { generateBFSSteps } from './algorithms/graph/bfs';
import { generateDFSSteps } from './algorithms/graph/dfs';
import { generateDijkstraSteps } from './algorithms/graph/dijkstra';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import BarView from './components/BarView';
import GraphView from './components/GraphView';
import ComparisonView from './components/ComparisonView';
import InfoPanel from './components/InfoPanel';
import Footer from './components/Footer';

import './App.css';

const STEP_GENERATORS = {
  bubbleSort: (data) => generateBubbleSortSteps(data.array),
  mergeSort: (data) => generateMergeSortSteps(data.array),
  quickSort: (data) => generateQuickSortSteps(data.array),
  binarySearch: (data) => generateBinarySearchSteps(data.sortedArray, data.target),
  bfs: (data) => generateBFSSteps(data.graph, data.startNode),
  dfs: (data) => generateDFSSteps(data.graph, data.startNode),
  dijkstra: (data) => generateDijkstraSteps(data.graph, data.startNode, data.endNode),
};

export default function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [viewMode, setViewMode] = useState('bar');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [dataSize, setDataSize] = useState(20);
  const [arrayData, setArrayData] = useState(() => generateRandomArray(20));
  const [sortedArrayData, setSortedArrayData] = useState(() => generateSortedArray(20));
  const [searchTarget, setSearchTarget] = useState(() => {
    const arr = generateSortedArray(20);
    return pickSearchTarget(arr);
  });

  const { graph, startNode, endNode, regenerateGraph } = useGraphData(12);
  const engine = useAlgorithm();

  const algorithm = ALGORITHMS[selectedAlgorithm];

  // Generate data bundle for algorithms
  const data = useMemo(() => ({
    array: arrayData,
    sortedArray: sortedArrayData,
    target: searchTarget,
    graph,
    startNode,
    endNode,
  }), [arrayData, sortedArrayData, searchTarget, graph, startNode, endNode]);

  // Generate new random data
  const handleGenerateData = useCallback(() => {
    engine.reset();
    const newArray = generateRandomArray(dataSize);
    const newSorted = generateSortedArray(dataSize);
    setArrayData(newArray);
    setSortedArrayData(newSorted);
    setSearchTarget(pickSearchTarget(newSorted));
    regenerateGraph(Math.max(6, Math.min(18, Math.floor(dataSize * 0.6))));
  }, [dataSize, engine, regenerateGraph]);

  // Handle algorithm change
  const handleAlgorithmChange = useCallback((algoId) => {
    engine.reset();
    engine.setSteps([]);
    setSelectedAlgorithm(algoId);
    const algo = ALGORITHMS[algoId];
    if (algo) {
      setViewMode(algo.defaultView);
    }
  }, [engine]);

  // Handle data size change
  const handleDataSizeChange = useCallback((size) => {
    setDataSize(size);
    engine.reset();
    const newArray = generateRandomArray(size);
    const newSorted = generateSortedArray(size);
    setArrayData(newArray);
    setSortedArrayData(newSorted);
    setSearchTarget(pickSearchTarget(newSorted));
    regenerateGraph(Math.max(6, Math.min(18, Math.floor(size * 0.6))));
  }, [engine, regenerateGraph]);

  // Precompute steps and play
  const handlePlay = useCallback(() => {
    const generator = STEP_GENERATORS[selectedAlgorithm];
    if (!generator) return;
    const steps = generator(data);
    engine.setSteps(steps);
    setTimeout(() => engine.play(), 30);
  }, [selectedAlgorithm, data, engine]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (engine.isPlaying) engine.pause();
          else if (engine.isPaused) engine.resume();
          else handlePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          engine.stepForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          engine.stepBackward();
          break;
        case 'KeyR':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            engine.reset();
          }
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [engine, handlePlay]);

  const currentPseudocodeLine = engine.currentStep?.pseudocodeLine ?? null;

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        {/* Left Sidebar: Controls */}
        <ControlPanel
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={handleAlgorithmChange}
          onPlay={handlePlay}
          onPause={engine.pause}
          onResume={engine.resume}
          onReset={engine.reset}
          onStepForward={engine.stepForward}
          onStepBackward={engine.stepBackward}
          onSpeedChange={engine.setSpeed}
          onGenerateData={handleGenerateData}
          onViewModeChange={setViewMode}
          onComparisonToggle={setComparisonMode}
          onDataSizeChange={handleDataSizeChange}
          status={engine.status}
          speed={engine.speed}
          viewMode={viewMode}
          comparisonMode={comparisonMode}
          dataSize={dataSize}
          progress={engine.progress}
          currentStepIndex={engine.currentStepIndex}
          totalSteps={engine.totalSteps}
        />

        {/* Center: Visualization */}
        <section className="visualization-area" id="visualization-area">
          {comparisonMode ? (
            <ComparisonView data={data} viewMode={viewMode} />
          ) : viewMode === 'graph' || algorithm?.category === 'graph' ? (
            <GraphView
              step={engine.currentStep}
              graph={graph}
              startNode={startNode}
              endNode={endNode}
            />
          ) : (
            <BarView
              step={engine.currentStep}
              algorithmId={selectedAlgorithm}
            />
          )}
        </section>

        {/* Right Sidebar: Info Panel */}
        {!comparisonMode && (
          <InfoPanel
            algorithm={algorithm}
            currentPseudocodeLine={currentPseudocodeLine}
            viewMode={viewMode}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
