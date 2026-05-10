import Footer from '../components/Footer.jsx';
import Logo from '../components/Logo.jsx';

function AboutPage({ theme, onBackHome, onToggleTheme }) {
  return (
    <main className="landing-shell">
      <nav className="site-nav dashboard-nav" aria-label="About navigation">
        <button className="brand-button" type="button" onClick={onBackHome}>
          <Logo />™
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
          <button type="button" onClick={onBackHome}>
            Home
          </button>
        </div>
      </nav>

      <section className="about-hero">
        <p className="eyebrow">About SpendNova</p>
        <h1>Expense tracking built for everyday clarity.</h1>
        <p>
          SpendNova is a modern personal finance web app that helps users log expenses,
          understand category patterns, preview live currency conversions, and export
          clean PDF reports from a focused dashboard.
        </p>
      </section>

      <section className="about-grid">
        <article className="panel">
          <p className="eyebrow">Mission</p>
          <h2>Make spending easier to understand</h2>
          <p>
            The goal is simple: give users a calm, readable workspace where expense
            decisions feel less scattered and more intentional.
          </p>
        </article>

        <article className="panel">
          <p className="eyebrow">What it offers</p>
          <h2>Track, convert, and report</h2>
          <p>
            SpendNova combines expense management, category insights, live exchange-rate
            previews, profile settings, and printable reports in one React experience.
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}

export default AboutPage;
