import { useState, useEffect, useCallback } from 'react';
import { useAlgorithm, STATES } from '../hooks/useAlgorithm';
import { ALGORITHMS } from '../algorithms/metadata';
import { generateBubbleSortSteps } from '../algorithms/sorting/bubbleSort';
import { generateMergeSortSteps } from '../algorithms/sorting/mergeSort';
import { generateQuickSortSteps } from '../algorithms/sorting/quickSort';
import { generateBinarySearchSteps } from '../algorithms/searching/binarySearch';
import { generateBFSSteps } from '../algorithms/graph/bfs';
import { generateDFSSteps } from '../algorithms/graph/dfs';
import { generateDijkstraSteps } from '../algorithms/graph/dijkstra';
import BarView from './BarView';
import GraphView from './GraphView';
import './ComparisonView.css';

const STEP_GENERATORS = {
  bubbleSort: (data) => generateBubbleSortSteps(data.array),
  mergeSort: (data) => generateMergeSortSteps(data.array),
  quickSort: (data) => generateQuickSortSteps(data.array),
  binarySearch: (data) => generateBinarySearchSteps(data.sortedArray, data.target),
  bfs: (data) => generateBFSSteps(data.graph, data.startNode),
  dfs: (data) => generateDFSSteps(data.graph, data.startNode),
  dijkstra: (data) => generateDijkstraSteps(data.graph, data.startNode, data.endNode),
};

export default function ComparisonView({ data, viewMode }) {
  const [leftAlgo, setLeftAlgo] = useState('bubbleSort');
  const [rightAlgo, setRightAlgo] = useState('mergeSort');
  const engine1 = useAlgorithm();
  const engine2 = useAlgorithm();

  const generateSteps = useCallback((algoId) => {
    const generator = STEP_GENERATORS[algoId];
    if (!generator) return [];
    return generator(data);
  }, [data]);

  const handlePlay = () => {
    const steps1 = generateSteps(leftAlgo);
    const steps2 = generateSteps(rightAlgo);
    engine1.setSteps(steps1);
    engine2.setSteps(steps2);
    setTimeout(() => {
      engine1.play();
      engine2.play();
    }, 50);
  };

  const handleReset = () => {
    engine1.reset();
    engine2.reset();
  };

  const handlePause = () => {
    engine1.pause();
    engine2.pause();
  };

  const isRunning = engine1.isPlaying || engine2.isPlaying;
  const algoMeta = ALGORITHMS;
  const isGraphAlgo = (id) => algoMeta[id]?.category === 'graph';

  return (
    <div className="comparison-view" id="comparison-view">
      <div className="comparison-header">
        <h3 className="comparison-title">⚔️ Algorithm Comparison</h3>
        <div className="comparison-controls">
          {isRunning ? (
            <button className="btn btn-primary" onClick={handlePause}>⏸ Pause</button>
          ) : (
            <button className="btn btn-primary" onClick={handlePlay}>▶ Compare</button>
          )}
          <button className="btn btn-danger" onClick={handleReset}>↺ Reset</button>
        </div>
      </div>

      <div className="comparison-panels">
        {/* Left Panel */}
        <div className="comparison-panel">
          <div className="comparison-panel-header">
            <select
              className="comparison-select"
              value={leftAlgo}
              onChange={(e) => setLeftAlgo(e.target.value)}
              disabled={isRunning}
            >
              {Object.values(algoMeta).map(a => (
                <option key={a.id} value={a.id}>{a.icon} {a.name}</option>
              ))}
            </select>
            <div className="comparison-stats">
              <span className="badge badge-cyan">
                Step {engine1.currentStepIndex + 1}/{engine1.totalSteps || 1}
              </span>
              {engine1.isComplete && <span className="badge badge-green">Done!</span>}
            </div>
          </div>
          <div className="comparison-panel-body">
            {isGraphAlgo(leftAlgo) || viewMode === 'graph' ? (
              <GraphView step={engine1.currentStep} graph={data.graph} startNode={data.startNode} endNode={data.endNode} />
            ) : (
              <BarView step={engine1.currentStep} algorithmId={leftAlgo} />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="comparison-divider">
          <span>VS</span>
        </div>

        {/* Right Panel */}
        <div className="comparison-panel">
          <div className="comparison-panel-header">
            <select
              className="comparison-select"
              value={rightAlgo}
              onChange={(e) => setRightAlgo(e.target.value)}
              disabled={isRunning}
            >
              {Object.values(algoMeta).map(a => (
                <option key={a.id} value={a.id}>{a.icon} {a.name}</option>
              ))}
            </select>
            <div className="comparison-stats">
              <span className="badge badge-cyan">
                Step {engine2.currentStepIndex + 1}/{engine2.totalSteps || 1}
              </span>
              {engine2.isComplete && <span className="badge badge-green">Done!</span>}
            </div>
          </div>
          <div className="comparison-panel-body">
            {isGraphAlgo(rightAlgo) || viewMode === 'graph' ? (
              <GraphView step={engine2.currentStep} graph={data.graph} startNode={data.startNode} endNode={data.endNode} />
            ) : (
              <BarView step={engine2.currentStep} algorithmId={rightAlgo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
