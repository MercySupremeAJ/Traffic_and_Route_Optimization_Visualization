import './ComplexityDisplay.css';

export default function ComplexityDisplay({ algorithm }) {
  if (!algorithm) return null;

  const { timeComplexity, spaceComplexity, stable } = algorithm;

  function getBadgeClass(complexity) {
    if (complexity.includes('1') || complexity.includes('log n')) return 'badge-green';
    if (complexity.includes('n log n') || complexity.includes('V + E')) return 'badge-amber';
    if (complexity.includes('n²') || complexity.includes('V²')) return 'badge-red';
    return 'badge-cyan';
  }

  return (
    <div className="complexity-display" id="complexity-display">
      <span className="label">Complexity Analysis</span>
      
      <div className="complexity-grid">
        <div className="complexity-item">
          <span className="complexity-label">Time (Best)</span>
          <span className={`badge ${getBadgeClass(timeComplexity.best)}`}>
            {timeComplexity.best}
          </span>
        </div>
        <div className="complexity-item">
          <span className="complexity-label">Time (Avg)</span>
          <span className={`badge ${getBadgeClass(timeComplexity.average)}`}>
            {timeComplexity.average}
          </span>
        </div>
        <div className="complexity-item">
          <span className="complexity-label">Time (Worst)</span>
          <span className={`badge ${getBadgeClass(timeComplexity.worst)}`}>
            {timeComplexity.worst}
          </span>
        </div>
        <div className="complexity-item">
          <span className="complexity-label">Space</span>
          <span className={`badge ${getBadgeClass(spaceComplexity)}`}>
            {spaceComplexity}
          </span>
        </div>
      </div>

      <div className="complexity-meta">
        <span className={`badge ${stable ? 'badge-green' : 'badge-amber'}`}>
          {stable ? '✓ Stable' : '✗ Unstable'}
        </span>
      </div>
    </div>
  );
}
