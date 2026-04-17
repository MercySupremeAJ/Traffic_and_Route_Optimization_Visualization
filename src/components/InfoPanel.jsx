import PseudocodeViewer from './PseudocodeViewer';
import ComplexityDisplay from './ComplexityDisplay';
import Legend from './Legend';
import './InfoPanel.css';

export default function InfoPanel({ algorithm, currentPseudocodeLine, viewMode }) {
  if (!algorithm) return null;

  return (
    <aside className="info-panel glass-card" id="info-panel">
      {/* Algorithm Title */}
      <div className="info-header">
        <h2 className="info-title">
          <span className="info-icon">{algorithm.icon}</span>
          {algorithm.name}
        </h2>
        <span className="badge badge-cyan">{algorithm.category}</span>
      </div>

      {/* Description */}
      <div className="info-description">
        <p>{algorithm.description}</p>
      </div>

      <div className="divider"></div>

      {/* Complexity */}
      <ComplexityDisplay algorithm={algorithm} />

      <div className="divider"></div>

      {/* Pseudocode */}
      <PseudocodeViewer
        algorithm={algorithm}
        currentPseudocodeLine={currentPseudocodeLine}
      />

      <div className="divider"></div>

      {/* Legend */}
      <Legend viewMode={viewMode} algorithmCategory={algorithm.category} />
    </aside>
  );
}
