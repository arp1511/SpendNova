import CategoryBreakdown from '../components/CategoryBreakdown.jsx';
import CurrencyConverter from '../components/CurrencyConverter.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import FiltersBar from '../components/FiltersBar.jsx';
import Footer from '../components/Footer.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import Logo from '../components/Logo.jsx';

function DashboardPage({
  categoryTotals,
  editingExpense,
  expenses,
  filteredExpenses,
  filters,
  lastDeletedExpense,
  notice,
  profile,
  theme,
  total,
  onAddExpense,
  onCancelEdit,
  onDeleteExpense,
  onEditExpense,
  onExportPdf,
  onFilterChange,
  onGoHome,
  onOpenAnalytics,
  onOpenProfile,
  onSignOut,
  onToggleTheme,
  onUndoDelete,
  onUpdateExpense
}) {
  return (
    <main className="app-shell">
      <nav className="site-nav dashboard-nav" aria-label="Dashboard navigation">
        <button className="brand-button" type="button" onClick={onGoHome}>
          <Logo />
        </button>
        <div>
          <button
            className="icon-nav-button"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'day' ? 'Switch to night mode' : 'Switch to day mode'}
            title={theme === 'day' ? 'Switch to night mode' : 'Switch to day mode'}
          >
            {theme === 'day' ? '\u{1F319}' : '\u2600\uFE0F'}
          </button>
          <button
            className="icon-nav-button"
            type="button"
            onClick={onOpenAnalytics}
            aria-label="Open analytics"
            title="Open analytics"
          >
            {'\u{1F4C8}'}
          </button>
          <button
            className="icon-nav-button"
            type="button"
            onClick={onOpenProfile}
            aria-label="Open profile"
            title="Open profile"
          >
            {'\u{1F464}'}
          </button>
          <button
            className="icon-nav-button"
            type="button"
            onClick={onSignOut}
            aria-label="Sign out"
            title="Sign out"
          >
            {'\u{1F6AA}'}
          </button>
        </div>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">SpendNova dashboard</p>
          <h1>Track every spend with live context.</h1>
          <p className="hero-copy">
            Add, edit, filter, export PDF reports, and watch live currency totals from a
            calm workspace built for everyday money decisions.
          </p>
          <div className="profile-actions" aria-label="Profile actions">
            <span>Hello, {profile.name || 'there'}</span>
            <button type="button" onClick={onExportPdf}>
              Export PDF
            </button>
          </div>
        </div>
        <SummaryPanel total={total} count={expenses.length} budget={profile.monthlyBudget} />
      </section>

      <section className="workspace" aria-label="Expense tracker workspace">
        <ExpenseForm
          editingExpense={editingExpense}
          onAddExpense={onAddExpense}
          onUpdateExpense={onUpdateExpense}
          onCancelEdit={onCancelEdit}
        />

        <div className="dashboard-main">
          <div className="insights">
            <CurrencyConverter amount={total} baseCurrency={profile.baseCurrency} />
            <CategoryBreakdown totals={categoryTotals} overallTotal={total} />
          </div>

          <section className="expense-list-area">
            <FiltersBar filters={filters} onChange={onFilterChange} />
            {notice ? <p className="toast">{notice}</p> : null}
            <ExpenseList
              expenses={filteredExpenses}
              lastDeletedExpense={lastDeletedExpense}
              onEditExpense={onEditExpense}
              onDeleteExpense={onDeleteExpense}
              onUndoDelete={onUndoDelete}
            />
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default DashboardPage;
