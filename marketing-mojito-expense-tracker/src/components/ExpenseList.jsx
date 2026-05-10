const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
});

function ExpenseList({ expenses, lastDeletedExpense, onEditExpense, onDeleteExpense, onUndoDelete }) {
  return (
    <section className="panel expense-list">
      <div className="panel-heading">
        <p className="eyebrow">Expense log</p>
        <h2>{expenses.length} matching expenses</h2>
      </div>

      {lastDeletedExpense ? (
        <div className="undo-banner">
          <span>Deleted {lastDeletedExpense.name}</span>
          <button type="button" onClick={() => onUndoDelete(lastDeletedExpense)}>
            Undo
          </button>
        </div>
      ) : null}

      {expenses.length === 0 ? (
        <div className="empty-state">
          <h3>No expenses found</h3>
          <p>Add a new expense or adjust filters to see more results.</p>
        </div>
      ) : (
        <div className="expense-items">
          {expenses.map((expense) => (
            <article className="expense-item" key={expense.id}>
              <div>
                <h3>{expense.name}</h3>
                <p>
                  {expense.category} · {new Date(expense.date).toLocaleDateString('en-IN')}
                </p>
                {expense.notes ? <p className="expense-notes">{expense.notes}</p> : null}
              </div>
              <div className="expense-actions">
                <strong>{currencyFormatter.format(expense.amount)}</strong>
                <button className="neutral-action" type="button" onClick={() => onEditExpense(expense)}>
                  Edit
                </button>
                <button className="danger-action" type="button" onClick={() => onDeleteExpense(expense.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExpenseList;
