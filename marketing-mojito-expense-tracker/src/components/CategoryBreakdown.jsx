const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
});

function CategoryBreakdown({ totals, overallTotal }) {
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const topCategories = entries.slice(0, 3).map(([category]) => category);

  return (
    <section className="panel breakdown-panel">
      <div className="panel-heading">
        <p className="eyebrow">By category</p>
        <h2>Spending breakdown</h2>
      </div>

      {entries.length === 0 ? (
        <p className="muted">Category totals will appear after you add expenses.</p>
      ) : (
        <div className="breakdown-list">
          {entries.map(([category, value]) => {
            const percentage = overallTotal > 0 ? Math.round((value / overallTotal) * 100) : 0;

            return (
              <div className="breakdown-row" key={category}>
                <div className="breakdown-label">
                  <span>
                    {category}
                    {topCategories.includes(category) ? <b>Top {topCategories.indexOf(category) + 1}</b> : null}
                  </span>
                  <strong>
                    {currencyFormatter.format(value)} · {percentage}%
                  </strong>
                </div>
                <div className="progress-track" aria-label={`${category} ${percentage}%`}>
                  <span style={{ width: `${percentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CategoryBreakdown;
