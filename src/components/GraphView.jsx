import { useMemo } from 'react';
import './GraphView.css';

export default function GraphView({ step, graph, startNode, endNode }) {
  if (!step || !graph) {
    return (
      <div className="graph-view-empty">
        <p>Press <strong>Play</strong> to begin graph traversal.</p>
      </div>
    );
  }

  const { visited = [], current, frontier = [], path = [], shortestPath = [], distances = {}, relaxedEdge, edges: visitedEdges = [] } = step;
  
  const svgWidth = 750;
  const svgHeight = 480;

  const nodeRadius = 20;

  // Determine edge class
  function getEdgeClass(edge) {
    const classes = ['graph-edge'];
    
    if (shortestPath && shortestPath.length > 1) {
      for (let i = 0; i < shortestPath.length - 1; i++) {
        if (
          (edge.from === shortestPath[i] && edge.to === shortestPath[i + 1]) ||
          (edge.to === shortestPath[i] && edge.from === shortestPath[i + 1])
        ) {
          classes.push('edge-shortest');
          return classes.join(' ');
        }
      }
    }

    if (relaxedEdge && (
      (edge.from === relaxedEdge.from && edge.to === relaxedEdge.to) ||
      (edge.to === relaxedEdge.from && edge.from === relaxedEdge.to)
    )) {
      classes.push('edge-relaxing');
    }

    const isVisitedEdge = visitedEdges.some(
      ve => (ve.from === edge.from && ve.to === edge.to) || (ve.to === edge.from && ve.from === edge.to)
    );

    if (isVisitedEdge) {
      classes.push('edge-visited');
    }

    return classes.join(' ');
  }

  // Determine node class
  function getNodeClass(nodeId) {
    const classes = ['graph-node'];

    if (nodeId === current) {
      classes.push('node-current');
    } else if (shortestPath && shortestPath.includes(nodeId)) {
      classes.push('node-path');
    } else if (visited.includes(nodeId)) {
      classes.push('node-visited');
    } else if (frontier.includes(nodeId)) {
      classes.push('node-frontier');
    }

    if (nodeId === startNode) classes.push('node-start');
    if (nodeId === endNode) classes.push('node-end');

    return classes.join(' ');
  }

  // Calculate edge midpoint for weight label
  function getEdgeMidpoint(edge) {
    const fromNode = graph.nodes.find(n => n.id === edge.from);
    const toNode = graph.nodes.find(n => n.id === edge.to);
    if (!fromNode || !toNode) return { x: 0, y: 0 };
    return {
      x: (fromNode.x + toNode.x) / 2,
      y: (fromNode.y + toNode.y) / 2 - 8,
    };
  }

  return (
    <div className="graph-view" id="graph-view">
      {/* Status */}
      <div className="graph-status">
        <p className="graph-description">{step.description}</p>
      </div>

      {/* SVG Canvas */}
      <div className="graph-canvas-wrapper">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="graph-canvas"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width={svgWidth} height={svgHeight} fill="url(#grid)" />
          
          {/* Lagos Map Label */}
          <text x="15" y="22" className="map-label" fill="rgba(0,229,255,0.2)" fontSize="12" fontFamily="var(--font-mono)" fontWeight="700">
            LAGOS CITY MAP
          </text>
          <text x={svgWidth - 15} y={svgHeight - 10} className="map-label" fill="rgba(255,255,255,0.08)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="end">
            Traffic & Route Optimizer
          </text>

          {/* Edges */}
          {graph.edges.map((edge, i) => {
            const fromNode = graph.nodes.find(n => n.id === edge.from);
            const toNode = graph.nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            const mid = getEdgeMidpoint(edge);
            const edgeClass = getEdgeClass(edge);
            
            return (
              <g key={`edge-${i}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={edgeClass}
                  filter={edgeClass.includes('shortest') ? 'url(#strongGlow)' : undefined}
                />
                <text
                  x={mid.x}
                  y={mid.y}
                  className="edge-weight-bg"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {edge.weight}
                </text>
                <text
                  x={mid.x}
                  y={mid.y}
                  className={`edge-weight ${edgeClass.includes('shortest') ? 'weight-highlight' : ''}`}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {graph.nodes.map((node) => {
            const nodeClass = getNodeClass(node.id);
            const dist = distances[node.id];
            const showDist = dist !== undefined && dist !== Infinity;

            return (
              <g key={node.id} className="node-group">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nodeRadius}
                  className={nodeClass}
                  filter={nodeClass.includes('current') ? 'url(#strongGlow)' : nodeClass.includes('visited') ? 'url(#glow)' : undefined}
                />
                <text
                  x={node.x}
                  y={node.y - nodeRadius - 8}
                  className="node-label"
                  textAnchor="middle"
                >
                  {node.label}
                </text>
                {showDist && (
                  <text
                    x={node.x}
                    y={node.y + 5}
                    className="node-distance"
                    textAnchor="middle"
                  >
                    {dist}
                  </text>
                )}
                {node.id === startNode && (
                  <text x={node.x} y={node.y + nodeRadius + 14} className="node-marker start-marker" textAnchor="middle">START</text>
                )}
                {node.id === endNode && (
                  <text x={node.x} y={node.y + nodeRadius + 14} className="node-marker end-marker" textAnchor="middle">END</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
