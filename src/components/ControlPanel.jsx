import { STATES } from '../hooks/useAlgorithm';
import { getAlgorithmsByCategory, ALGORITHMS } from '../algorithms/metadata';
import './ControlPanel.css';

export default function ControlPanel({
  selectedAlgorithm,
  onAlgorithmChange,
  onPlay,
  onPause,
  onResume,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  onGenerateData,
  onViewModeChange,
  onComparisonToggle,
  onDataSizeChange,
  status,
  speed,
  viewMode,
  comparisonMode,
  dataSize,
  progress,
  currentStepIndex,
  totalSteps,
}) {
  const groups = getAlgorithmsByCategory();
  const categoryLabels = {
    sorting: '🚦 Sorting',
    searching: '🔍 Searching',
    graph: '🗺️ Graph Traversal',
  };

  const isRunning = status === STATES.RUNNING;
  const isPaused = status === STATES.PAUSED;
  const isIdle = status === STATES.IDLE;
  const isComplete = status === STATES.COMPLETE;

  const speedLabel = speed <= 100 ? 'Lightning' : speed <= 250 ? 'Fast' : speed <= 500 ? 'Normal' : speed <= 750 ? 'Slow' : 'Detailed';

  return (
    <aside className="control-panel glass-card" id="control-panel">
      {/* Algorithm Selection */}
      <div className="control-section">
        <label className="label" htmlFor="algorithm-select">Algorithm</label>
        <div className="select-wrapper">
          <select
            id="algorithm-select"
            value={selectedAlgorithm}
            onChange={(e) => onAlgorithmChange(e.target.value)}
            disabled={isRunning}
          >
            {Object.entries(groups).map(([category, algos]) => (
              <optgroup key={category} label={categoryLabels[category] || category}>
                {algos.map((algo) => (
                  <option key={algo.id} value={algo.id}>
                    {algo.icon} {algo.name} — {algo.trafficMetaphor}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <p className="control-hint">
          {ALGORITHMS[selectedAlgorithm]?.icon} {ALGORITHMS[selectedAlgorithm]?.trafficMetaphor}
        </p>
      </div>

      <div className="divider"></div>

      {/* Transport Controls */}
      <div className="control-section">
        <label className="label">Controls</label>
        <div className="transport-controls">
          <button
            className="btn btn-icon tooltip"
            data-tooltip="Step Back"
            onClick={onStepBackward}
            disabled={isRunning || currentStepIndex === 0}
            id="btn-step-back"
          >
            ⏮
          </button>

          {isRunning ? (
            <button
              className="btn btn-primary btn-play tooltip"
              data-tooltip="Pause"
              onClick={onPause}
              id="btn-pause"
            >
              ⏸ Pause
            </button>
          ) : isPaused ? (
            <button
              className="btn btn-primary btn-play tooltip"
              data-tooltip="Resume"
              onClick={onResume}
              id="btn-resume"
            >
              ▶ Resume
            </button>
          ) : (
            <button
              className="btn btn-primary btn-play tooltip"
              data-tooltip="Play"
              onClick={onPlay}
              id="btn-play"
            >
              ▶ Play
            </button>
          )}

          <button
            className="btn btn-icon tooltip"
            data-tooltip="Step Forward"
            onClick={onStepForward}
            disabled={isRunning || isComplete}
            id="btn-step-forward"
          >
            ⏭
          </button>

          <button
            className="btn btn-icon btn-danger tooltip"
            data-tooltip="Reset"
            onClick={onReset}
            disabled={isIdle && currentStepIndex === 0}
            id="btn-reset"
          >
            ↺
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="control-section">
        <div className="progress-info">
          <span className="progress-label">Step {currentStepIndex + 1} / {totalSteps || 1}</span>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Speed Slider */}
      <div className="control-section">
        <label className="label" htmlFor="speed-slider">
          Speed: <span className="speed-value">{speedLabel}</span>
        </label>
        <input
          type="range"
          id="speed-slider"
          min="50"
          max="1000"
          step="50"
          value={1050 - speed}
          onChange={(e) => onSpeedChange(1050 - Number(e.target.value))}
        />
        <div className="slider-labels">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Data Size */}
      <div className="control-section">
        <label className="label" htmlFor="size-slider">
          Data Size: <span className="speed-value">{dataSize}</span>
        </label>
        <input
          type="range"
          id="size-slider"
          min="6"
          max="40"
          step="1"
          value={dataSize}
          onChange={(e) => onDataSizeChange(Number(e.target.value))}
          disabled={isRunning || isPaused}
        />
        <div className="slider-labels">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>

      <div className="divider"></div>

      {/* View Mode */}
      <div className="control-section">
        <label className="label">View Mode</label>
        <div className="view-toggle">
          <button
            className={`btn view-btn ${viewMode === 'bar' ? 'active' : ''}`}
            onClick={() => onViewModeChange('bar')}
            id="btn-bar-view"
          >
            📊 Bar View
          </button>
          <button
            className={`btn view-btn ${viewMode === 'graph' ? 'active' : ''}`}
            onClick={() => onViewModeChange('graph')}
            id="btn-graph-view"
          >
            🗺️ Graph View
          </button>
        </div>
      </div>

      {/* Comparison Mode */}
      <div className="control-section">
        <label className="toggle" id="comparison-toggle">
          <input
            type="checkbox"
            checked={comparisonMode}
            onChange={(e) => onComparisonToggle(e.target.checked)}
            disabled={isRunning}
          />
          <span className="toggle-track"></span>
          <span className="toggle-label">Compare Algorithms</span>
        </label>
      </div>

      <div className="divider"></div>

      {/* Generate New Data */}
      <div className="control-section">
        <button
          className="btn btn-generate"
          onClick={onGenerateData}
          disabled={isRunning}
          id="btn-generate"
        >
          🔄 Generate New Data
        </button>
      </div>
    </aside>
  );
}
