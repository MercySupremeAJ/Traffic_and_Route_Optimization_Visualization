import './Legend.css';

export default function Legend({ viewMode, algorithmCategory }) {
  const barLegend = [
    { color: 'var(--accent-cyan)', label: 'Default' },
    { color: 'var(--accent-amber)', label: 'Comparing' },
    { color: 'var(--accent-magenta)', label: 'Swapping' },
    { color: 'var(--accent-green)', label: 'Sorted' },
    { color: 'var(--accent-red)', label: 'Pivot' },
  ];

  const searchLegend = [
    { color: 'var(--accent-cyan)', label: 'Search Range' },
    { color: 'var(--accent-purple)', label: 'Mid Point' },
    { color: 'var(--accent-green)', label: 'Found' },
    { color: '#5c6480', label: 'Eliminated' },
  ];

  const graphLegend = [
    { color: 'var(--accent-cyan)', label: 'Current Node' },
    { color: 'var(--accent-amber)', label: 'In Queue/Stack' },
    { color: 'var(--accent-green)', label: 'Visited' },
    { color: 'var(--accent-magenta)', label: 'Shortest Path' },
    { color: '#5c6480', label: 'Unvisited' },
  ];

  let items;
  if (viewMode === 'graph' || algorithmCategory === 'graph') {
    items = graphLegend;
  } else if (algorithmCategory === 'searching') {
    items = searchLegend;
  } else {
    items = barLegend;
  }

  return (
    <div className="legend" id="legend">
      <span className="label">Color Legend</span>
      <div className="legend-items">
        {items.map((item, i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ background: item.color }}></span>
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
