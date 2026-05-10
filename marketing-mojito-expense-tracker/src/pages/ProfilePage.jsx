import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import Logo from '../components/Logo.jsx';

const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

function ProfilePage({
  expensesCount,
  profile,
  theme,
  total,
  onBackDashboard,
  onChangePassword,
  onDeleteAccount,
  onExportPdf,
  onOpenAnalytics,
  onSignOut,
  onToggleTheme,
  onUpdateProfile
}) {
  const [profileForm, setProfileForm] = useState({
    name: profile.name || '',
    email: profile.email || '',
    baseCurrency: profile.baseCurrency || 'INR',
    monthlyBudget: String(profile.monthlyBudget || 0)
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    nextPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function updateProfileField(event) {
    const { name, value } = event.target;
    setProfileForm((current) => ({ ...current, [name]: value }));
    setMessage('');
    setError('');
  }

  function updatePasswordField(event) {
    const { name, value } = event.target;
    setPasswordForm((current) => ({ ...current, [name]: value }));
    setMessage('');
    setError('');
  }

  function saveProfile(event) {
    event.preventDefault();
    const budget = Number(profileForm.monthlyBudget);

    if (!profileForm.name.trim()) {
      setError('Enter your name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (!Number.isFinite(budget) || budget < 0) {
      setError('Enter a valid monthly budget.');
      return;
    }

    onUpdateProfile({
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      baseCurrency: profileForm.baseCurrency,
      monthlyBudget: Math.round(budget * 100) / 100
    });
    setMessage('Profile updated.');
  }

  function savePassword(event) {
    event.preventDefault();

    if (!passwordForm.currentPassword) {
      setError('Enter your current password.');
      return;
    }

    if (!passwordPattern.test(passwordForm.nextPassword)) {
      setError('Use 8+ characters with uppercase, lowercase, number, and symbol.');
      return;
    }

    if (passwordForm.nextPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    onChangePassword();
    setPasswordForm({ currentPassword: '', nextPassword: '', confirmPassword: '' });
    setMessage('Password updated for this demo session.');
  }

  function deleteAccount() {
    const confirmed = window.confirm('Delete this local SpendNova account and all saved expenses?');
    if (confirmed) {
      onDeleteAccount();
    }
  }

  return (
    <main className="app-shell profile-shell">
      <nav className="site-nav dashboard-nav" aria-label="Profile navigation">
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
            onClick={onOpenAnalytics}
            aria-label="Open analytics"
            title="Open analytics"
          >
            {'\u{1F4C8}'}
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

      <section className="profile-hero">
        <div>
          <p className="eyebrow">Account settings</p>
          <h1>Your SpendNova profile</h1>
          <p className="hero-copy">
            Manage stored profile details, budget preferences, password, and local account data.
          </p>
          <div className="profile-actions" aria-label="Page actions">
            <button className="neutral-action" type="button" onClick={onBackDashboard}>
              &larr; Back to Dashboard
            </button>
          </div>
        </div>
        <div className="profile-stats">
          <div>
            <span>Saved expenses</span>
            <strong>{expensesCount}</strong>
          </div>
          <div>
            <span>Total tracked</span>
            <strong>
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
              }).format(total)}
            </strong>
          </div>
        </div>
      </section>

      {message ? <p className="toast">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      <section className="profile-grid">
        <form className="panel" onSubmit={saveProfile}>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Identity</p>
              <h2>Profile details</h2>
            </div>
          </div>

          <label>
            <span>Name</span>
            <input name="name" value={profileForm.name} onChange={updateProfileField} />
          </label>

          <label>
            <span>Email</span>
            <input name="email" type="email" value={profileForm.email} onChange={updateProfileField} />
          </label>

          <label>
            <span>Base currency</span>
            <select name="baseCurrency" value={profileForm.baseCurrency} onChange={updateProfileField}>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Monthly budget</span>
            <input
              name="monthlyBudget"
              type="number"
              min="0"
              step="0.01"
              value={profileForm.monthlyBudget}
              onChange={updateProfileField}
            />
          </label>

          <button className="primary-action" type="submit">
            Save profile
          </button>
        </form>

        <form className="panel" onSubmit={savePassword}>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Security</p>
              <h2>Change password</h2>
            </div>
          </div>

          <label>
            <span>Current password</span>
            <input
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={updatePasswordField}
            />
          </label>

          <label>
            <span>New password</span>
            <input
              name="nextPassword"
              type="password"
              value={passwordForm.nextPassword}
              onChange={updatePasswordField}
            />
          </label>

          <label>
            <span>Confirm new password</span>
            <input
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={updatePasswordField}
            />
          </label>

          <button className="primary-action" type="submit">
            Update password
          </button>
        </form>

        <section className="panel danger-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Data</p>
              <h2>Account controls</h2>
            </div>
          </div>
          <p>
            Export a PDF report before deleting local account data. Deletion clears the
            browser-stored profile, session, and expenses.
          </p>
          <div className="account-actions">
            <button className="neutral-action" type="button" onClick={onExportPdf}>
              Export PDF
            </button>
            <button className="danger-action" type="button" onClick={deleteAccount}>
              Delete account
            </button>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}

export default ProfilePage;
