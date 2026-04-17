import './BarView.css';

export default function BarView({ step, algorithmId }) {
  if (!step || !step.array) {
    return (
      <div className="bar-view-empty">
        <p>Press <strong>Play</strong> or <strong>Generate Data</strong> to begin.</p>
      </div>
    );
  }

  const { array, comparing, swapping, sorted, pivot, low, high, mid, target, eliminated, found } = step;
  const maxVal = Math.max(...array, 1);

  const isSearchAlgorithm = algorithmId === 'binarySearch';

  function getBarClass(index) {
    const classes = ['bar'];

    if (sorted && sorted.includes(index)) {
      classes.push('bar-sorted');
    } else if (swapping && swapping.includes(index)) {
      classes.push('bar-swapping');
    } else if (comparing && comparing.includes(index)) {
      classes.push('bar-comparing');
    } else if (pivot !== null && pivot !== undefined && index === pivot) {
      classes.push('bar-pivot');
    } else if (isSearchAlgorithm && eliminated && eliminated.includes(index)) {
      classes.push('bar-eliminated');
    } else if (isSearchAlgorithm && index === mid) {
      classes.push('bar-mid');
    }

    // Search range highlighting
    if (isSearchAlgorithm && low !== undefined && high !== undefined) {
      if (index >= low && index <= high && !eliminated?.includes(index)) {
        classes.push('bar-in-range');
      }
    }

    if (found && index === mid) {
      classes.push('bar-found');
    }

    return classes.join(' ');
  }

  return (
    <div className="bar-view" id="bar-view">
      {/* Status Description */}
      <div className="bar-status">
        <p className="bar-description">{step.description}</p>
        {isSearchAlgorithm && target !== undefined && (
          <span className="search-target badge badge-amber">Target: {target}</span>
        )}
      </div>

      {/* Bars Container */}
      <div className="bars-container">
        {array.map((value, index) => {
          const heightPercent = (value / maxVal) * 85;
          return (
            <div
              key={index}
              className={getBarClass(index)}
              style={{
                height: `${heightPercent}%`,
                width: `${Math.max(100 / array.length - 1, 1.5)}%`,
                transitionDelay: `${index * 5}ms`,
              }}
            >
              <span className="bar-value">{value}</span>
              <span className="bar-index">{index}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
