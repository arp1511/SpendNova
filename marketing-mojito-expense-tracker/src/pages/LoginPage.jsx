import AuthPanel from '../components/AuthPanel.jsx';

function LoginPage({ profile, theme, onBackHome, onSignIn, onToggleTheme }) {
  return (
    <AuthPanel
      profile={profile}
      theme={theme}
      onToggleTheme={onToggleTheme}
      onBackHome={onBackHome}
      onSignIn={onSignIn}
    />
  );
}

export default LoginPage;
