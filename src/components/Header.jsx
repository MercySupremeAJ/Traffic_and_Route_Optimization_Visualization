import './Header.css';

export default function Header() {
  return (
    <header className="header" id="app-header">
      <div className="header-content">
        <div className="header-brand">
          <div className="traffic-light">
            <span className="light red"></span>
            <span className="light amber"></span>
            <span className="light green"></span>
          </div>
          <div className="header-text">
            <h1 className="header-title">
              <span className="title-traffic">Traffic</span>
              <span className="title-separator">&</span>
              <span className="title-route">Route</span>
              <span className="title-main">Optimizer</span>
            </h1>
            <p className="header-subtitle">Algorithm Visualization × Lagos Urban Mobility</p>
          </div>
        </div>
        <div className="header-badge">
          <span className="badge badge-cyan">Interactive Simulator</span>
        </div>
      </div>
    </header>
  );
}
