import { useState, useEffect } from 'react';
import './WelcomeOverlay.css';

export default function WelcomeOverlay({ onDismiss }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('welcome-dismissed');
    if (dismissed) {
      setVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    sessionStorage.setItem('welcome-dismissed', 'true');
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 400);
  };

  if (!visible) return null;

  return (
    <div className={`welcome-overlay ${exiting ? 'exiting' : ''}`} id="welcome-overlay">
      <div className="welcome-card">
        <div className="welcome-traffic-light">
          <div className="wl-body">
            <div className="wl-light red"></div>
            <div className="wl-light amber"></div>
            <div className="wl-light green"></div>
          </div>
        </div>

        <h2 className="welcome-title">
          <span className="wt-traffic">Traffic</span> & <span className="wt-route">Route</span> Optimizer
        </h2>
        <p className="welcome-subtitle">Lagos Urban Mobility Simulation</p>

        <div className="welcome-features">
          <div className="welcome-feature">
            <span className="wf-icon">📊</span>
            <div>
              <strong>Bar View</strong>
              <p>Watch sorting algorithms optimize traffic flow</p>
            </div>
          </div>
          <div className="welcome-feature">
            <span className="wf-icon">🗺️</span>
            <div>
              <strong>Graph View</strong>
              <p>Navigate routes across Lagos intersections</p>
            </div>
          </div>
          <div className="welcome-feature">
            <span className="wf-icon">⚔️</span>
            <div>
              <strong>Compare</strong>
              <p>Race algorithms side-by-side</p>
            </div>
          </div>
        </div>

        <div className="welcome-shortcuts">
          <span><kbd>Space</kbd> Play/Pause</span>
          <span><kbd>←</kbd><kbd>→</kbd> Step</span>
          <span><kbd>R</kbd> Reset</span>
        </div>

        <button className="btn btn-primary welcome-btn" onClick={handleDismiss}>
          🚀 Start Exploring
        </button>
      </div>
    </div>
  );
}
