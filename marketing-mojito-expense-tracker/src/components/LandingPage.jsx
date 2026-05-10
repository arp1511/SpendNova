import Footer from './Footer.jsx';
import Logo from './Logo.jsx';

function LandingPage({ theme, onToggleTheme, onGetStarted }) {
  return (
    <main className="landing-shell">
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="brand-mark"><Logo /></div>
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
          <button type="button" onClick={onGetStarted}>
            Open tracker
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div>
          <p className="eyebrow">Next-gen expense intelligence</p>
          <h1>Personal finance, but lighter and faster.</h1>
          <p className="hero-copy">
            SpendNova helps you capture expenses, understand category patterns, and
            check live multi-currency totals before your budget drifts.
          </p>
          <div className="landing-actions">
            <button className="primary-action" type="button" onClick={onGetStarted}>
              Start tracking
            </button>
            <a href="#features">View features</a>
          </div>
        </div>

        <div className="hero-visual" aria-label="SpendNova feature preview">
          <div className="visual-card total-preview">
            <span>Workspace preview</span>
            <strong>Track</strong>
            <p>Add expenses, review totals, and keep your month organized.</p>
          </div>
          <div className="visual-grid">
            <div className="visual-card">
              <span>Analyze</span>
              <strong>By category</strong>
            </div>
            <div className="visual-card">
              <span>Convert</span>
              <strong>Live rates</strong>
            </div>
            <div className="visual-card wide-card">
              <span>Report</span>
              <strong>Export PDF</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-band" id="features">
        <article>
          <span>01</span>
          <h2>Log without friction</h2>
          <p>Add date, category, amount, and notes in a compact form built for repeat use.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Read your spend</h2>
          <p>Search, sort, filter, and view top categories with real-time summary cards.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Export clean reports</h2>
          <p>Generate a printable PDF report for sharing or submission directly from the app.</p>
        </article>
      </section>

      <Footer />
    </main>
  );
}

export default LandingPage;
