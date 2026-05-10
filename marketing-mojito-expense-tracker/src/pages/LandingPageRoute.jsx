import LandingPage from '../components/LandingPage.jsx';

function LandingPageRoute({ isSignedIn, theme, onToggleTheme, onNavigate }) {
  return (
    <LandingPage
      theme={theme}
      onToggleTheme={onToggleTheme}
      onGetStarted={() => onNavigate(isSignedIn ? '/app' : '/login')}
    />
  );
}

export default LandingPageRoute;
