function SummaryPanel({ total, count, budget }) {
  const budgetUsed = budget > 0 ? Math.min(Math.round((total / budget) * 100), 999) : 0;
  const isOverBudget = total > budget;

  return (
    <aside className="summary-card" aria-label="Expense summary">
      <span>Total spend</span>
      <strong>
        {new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(total)}
      </strong>
      <p>
        {count} {count === 1 ? 'expense' : 'expenses'} recorded
      </p>
      <div className="budget-meter">
        <div>
          <span>Monthly budget</span>
          <b>{budgetUsed}% used</b>
        </div>
        <div className="budget-track">
          <span className={isOverBudget ? 'over-budget' : ''} style={{ width: `${Math.min(budgetUsed, 100)}%` }} />
        </div>
      </div>
    </aside>
  );
}

export default SummaryPanel;
