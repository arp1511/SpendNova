import React from 'react';
import Footer from '../components/Footer.jsx';
import AnalyticsPieChart from '../components/AnalyticsPieChart.jsx';
import AnalyticsBarChart from '../components/AnalyticsBarChart.jsx';
import AnalyticsInsights from '../components/AnalyticsInsights.jsx';
import Logo from '../components/Logo.jsx';

function AnalyticsPage({
  expenses,
  categoryTotals,
  theme,
  onBackDashboard,
  onToggleTheme,
  onSignOut,
  onOpenProfile
}) {
  return (
    <main className="app-shell">
      <nav className="site-nav dashboard-nav" aria-label="Analytics navigation">
        <button className="brand-button" type="button" onClick={onBackDashboard}>
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
            onClick={onBackDashboard}
            aria-label="Back to dashboard"
            title="Back to dashboard"
          >
            {'\u{1F3E0}'}
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
          <p className="eyebrow">Visualizations</p>
          <h1>Your Spending Analytics</h1>
          <p className="hero-copy">
            Analyze your expenses through graphical representations. Understand where your money goes.
          </p>
          <div className="profile-actions" aria-label="Page actions">
            <button className="neutral-action" type="button" onClick={onBackDashboard}>
              &larr; Back to Dashboard
            </button>
          </div>
        </div>
      </section>

      <section aria-label="Analytics charts">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
          <AnalyticsPieChart categoryTotals={categoryTotals} />
          <AnalyticsBarChart expenses={expenses} />
          <AnalyticsInsights expenses={expenses} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default AnalyticsPage;
