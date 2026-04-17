import './StatsBar.css';

export default function StatsBar({ currentStep, currentStepIndex, totalSteps, status, algorithmId }) {
  if (!currentStep) return null;

  const { comparing, swapping, sorted, visited, shortestPath } = currentStep;
  const isGraph = !!visited;

  return (
    <div className="stats-bar" id="stats-bar">
      <div className="stat-item">
        <span className="stat-value">{currentStepIndex + 1}</span>
        <span className="stat-label">Current Step</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{totalSteps}</span>
        <span className="stat-label">Total Steps</span>
      </div>
      {!isGraph && sorted && (
        <div className="stat-item stat-green">
          <span className="stat-value">{sorted.length}</span>
          <span className="stat-label">Sorted</span>
        </div>
      )}
      {!isGraph && comparing && (
        <div className="stat-item stat-amber">
          <span className="stat-value">{comparing.length > 0 ? '⟷' : '—'}</span>
          <span className="stat-label">Comparing</span>
        </div>
      )}
      {!isGraph && swapping && (
        <div className="stat-item stat-magenta">
          <span className="stat-value">{swapping.length > 0 ? '↔' : '—'}</span>
          <span className="stat-label">Swapping</span>
        </div>
      )}
      {isGraph && visited && (
        <div className="stat-item stat-green">
          <span className="stat-value">{visited.length}</span>
          <span className="stat-label">Visited</span>
        </div>
      )}
      {isGraph && shortestPath && shortestPath.length > 0 && (
        <div className="stat-item stat-magenta">
          <span className="stat-value">{shortestPath.length}</span>
          <span className="stat-label">Path Length</span>
        </div>
      )}
      <div className="stat-item stat-status">
        <span className={`stat-indicator ${status.toLowerCase()}`}></span>
        <span className="stat-label">{status}</span>
      </div>
    </div>
  );
}
