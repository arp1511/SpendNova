function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function money(value) {
  return `&#8377;${Number(value).toFixed(2)}`;
}

export function exportExpensePdfReport({ categoryTotals, expenses, profile, total }) {
  const categoryRows = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([category, value]) => `<tr><td>${escapeHtml(category)}</td><td>${money(value)}</td></tr>`)
    .join('');

  const expenseRows = expenses
    .map(
      (expense) => `
        <tr>
          <td>${escapeHtml(expense.date)}</td>
          <td>${escapeHtml(expense.name)}</td>
          <td>${escapeHtml(expense.category)}</td>
          <td>${money(expense.amount)}</td>
        </tr>
      `
    )
    .join('');

  const reportWindow = window.open('', '_blank', 'width=960,height=720');

  if (!reportWindow) {
    return false;
  }

  const budgetUsed =
    profile.monthlyBudget > 0 ? Math.round((total / profile.monthlyBudget) * 100) : 0;

  reportWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>SpendNova Expense Report</title>
        <style>
          body { font-family: Inter, Arial, sans-serif; color: #172033; margin: 40px; }
          h1 { font-size: 34px; margin: 0 0 8px; }
          h2 { margin-top: 28px; font-size: 18px; }
          p { color: #5b6475; }
          .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 24px 0; }
          .card { border: 1px solid #dce2ea; border-radius: 8px; padding: 16px; }
          .card span { display: block; color: #697386; font-size: 12px; text-transform: uppercase; }
          .card strong { display: block; margin-top: 8px; font-size: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border-bottom: 1px solid #e4e9f0; padding: 10px; text-align: left; }
          th { background: #f5f7fb; }
          button { border: 0; border-radius: 8px; background: #0f766e; color: white; padding: 10px 14px; font-weight: 800; }
          @media print { button { display: none; } body { margin: 24px; } }
        </style>
      </head>
      <body>
        <button onclick="window.print()">Save as PDF</button>
        <h1>SpendNova Expense Report</h1>
        <p>${escapeHtml(profile.email)} &middot; Generated ${escapeHtml(new Date().toLocaleString('en-IN'))}</p>
        <div class="summary">
          <div class="card"><span>Total spend</span><strong>${money(total)}</strong></div>
          <div class="card"><span>Expenses</span><strong>${expenses.length}</strong></div>
          <div class="card"><span>Budget used</span><strong>${budgetUsed}%</strong></div>
        </div>
        <h2>Category Summary</h2>
        <table><thead><tr><th>Category</th><th>Total</th></tr></thead><tbody>${categoryRows}</tbody></table>
        <h2>Expense Log</h2>
        <table><thead><tr><th>Date</th><th>Name</th><th>Category</th><th>Amount</th></tr></thead><tbody>${expenseRows}</tbody></table>
        <script>setTimeout(() => window.print(), 300);</script>
      </body>
    </html>
  `);
  reportWindow.document.close();

  return true;
}
