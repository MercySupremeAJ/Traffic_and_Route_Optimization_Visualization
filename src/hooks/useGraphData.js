/**
 * useGraphData — Manages graph state for graph-based algorithm visualization
 * Handles node/edge generation, start/end selection for pathfinding.
 */
import { useState, useCallback } from 'react';
import { generateCityGraph, getDefaultEndpoints } from '../utils/graphGenerator';

export function useGraphData(initialNodeCount = 12) {
  const [graph, setGraph] = useState(() => generateCityGraph(initialNodeCount));
  const [startNode, setStartNode] = useState(() => getDefaultEndpoints(generateCityGraph(initialNodeCount)).startId);
  const [endNode, setEndNode] = useState(() => getDefaultEndpoints(generateCityGraph(initialNodeCount)).endId);

  // Initialize properly with the current graph
  const initializeGraph = useCallback((nodeCount = 12) => {
    const newGraph = generateCityGraph(nodeCount);
    const { startId, endId } = getDefaultEndpoints(newGraph);
    setGraph(newGraph);
    setStartNode(startId);
    setEndNode(endId);
    return newGraph;
  }, []);

  const regenerateGraph = useCallback((nodeCount) => {
    return initializeGraph(nodeCount);
  }, [initializeGraph]);

  const selectStartNode = useCallback((nodeId) => {
    setStartNode(nodeId);
  }, []);

  const selectEndNode = useCallback((nodeId) => {
    setEndNode(nodeId);
  }, []);

  return {
    graph,
    startNode,
    endNode,
    setGraph,
    regenerateGraph,
    selectStartNode,
    selectEndNode,
  };
}
