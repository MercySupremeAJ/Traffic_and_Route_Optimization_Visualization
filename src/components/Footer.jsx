import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer" id="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-brand">🚦 Traffic & Route Optimizer</span>
          <span className="footer-divider">•</span>
          <span className="footer-tagline">Lagos Urban Mobility Simulation</span>
        </div>
        <div className="footer-center">
          <span className="footer-shortcuts">
            <kbd>Space</kbd> Play/Pause
            <span className="footer-divider">•</span>
            <kbd>←</kbd><kbd>→</kbd> Step
            <span className="footer-divider">•</span>
            <kbd>R</kbd> Reset
          </span>
        </div>
        <div className="footer-right">
          <span className="footer-credit">Built by <strong>MercySupremeAJ</strong></span>
        </div>
      </div>
    </footer>
  );
}
