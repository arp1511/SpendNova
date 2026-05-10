import { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LandingPageRoute from './pages/LandingPageRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import { exportExpensePdfReport } from './utils/exportReport.js';

function createExpenseId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const STORAGE_KEYS = {
  session: 'expense-tracker-session',
  expenses: 'expense-tracker-expenses',
  profile: 'expense-tracker-profile',
  theme: 'spendnova-theme'
};

const SESSION_LENGTH = 24 * 60 * 60 * 1000;

const initialExpenses = [
  {
    id: createExpenseId(),
    name: 'Client lunch',
    amount: 1850,
    category: 'Food',
    date: '2026-05-08',
    notes: 'Team meeting after the pitch'
  },
  {
    id: createExpenseId(),
    name: 'Metro card recharge',
    amount: 600,
    category: 'Travel',
    date: '2026-05-09',
    notes: ''
  },
  {
    id: createExpenseId(),
    name: 'Ad campaign tools',
    amount: 3200,
    category: 'Marketing',
    date: '2026-05-10',
    notes: 'Monthly subscription'
  }
];

function loadJson(key, fallback) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function SpendNovaRoutes() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => window.localStorage.getItem(STORAGE_KEYS.theme) || 'day');
  const [session, setSession] = useState(() => loadJson(STORAGE_KEYS.session, null));
  const [profile, setProfile] = useState(() =>
    loadJson(STORAGE_KEYS.profile, {
      name: 'Arpita',
      email: 'arpita@example.com',
      baseCurrency: 'INR',
      monthlyBudget: 10000
    })
  );
  const [expenses, setExpenses] = useState(() => loadJson(STORAGE_KEYS.expenses, initialExpenses));
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    sortBy: 'date-desc',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: ''
  });
  const [notice, setNotice] = useState('');
  const [lastDeletedExpense, setLastDeletedExpense] = useState(null);
  const undoTimer = useRef(null);
  const noticeTimer = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'night');
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    if (!session) {
      return;
    }

    if (Date.now() > session.expiresAt) {
      setSession(null);
      window.localStorage.removeItem(STORAGE_KEYS.session);
      navigate('/login', { replace: true });
    }
  }, [navigate, session]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
  }, [profile]);

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses]
  );

  const categoryTotals = useMemo(() => {
    return expenses.reduce((groups, expense) => {
      groups[expense.category] = (groups[expense.category] || 0) + expense.amount;
      return groups;
    }, {});
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    const minAmount = Number(filters.minAmount);
    const maxAmount = Number(filters.maxAmount);

    return expenses
      .filter((expense) => {
        const matchesSearch = expense.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === 'All' || expense.category === filters.category;
        const matchesMin = !filters.minAmount || expense.amount >= minAmount;
        const matchesMax = !filters.maxAmount || expense.amount <= maxAmount;
        const matchesStart = !filters.startDate || expense.date >= filters.startDate;
        const matchesEnd = !filters.endDate || expense.date <= filters.endDate;

        return matchesSearch && matchesCategory && matchesMin && matchesMax && matchesStart && matchesEnd;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'amount-desc') return b.amount - a.amount;
        if (filters.sortBy === 'amount-asc') return a.amount - b.amount;
        if (filters.sortBy === 'category') return a.category.localeCompare(b.category);
        if (filters.sortBy === 'date-asc') return a.date.localeCompare(b.date);
        return b.date.localeCompare(a.date);
      });
  }, [expenses, filters]);

  function toggleTheme() {
    setTheme((current) => (current === 'day' ? 'night' : 'day'));
  }

  function showNotice(message, duration = 4000) {
    window.clearTimeout(noticeTimer.current);
    setNotice(message);
    noticeTimer.current = window.setTimeout(() => {
      setNotice('');
    }, duration);
  }

  function signIn({ name, email, remember }) {
    const nextSession = {
      email,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_LENGTH
    };

    setProfile((current) => ({ ...current, name, email }));
    setSession(nextSession);
    if (remember) {
      window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(nextSession));
    }
    navigate('/app', { replace: true });
  }

  function signOut() {
    setSession(null);
    window.localStorage.removeItem(STORAGE_KEYS.session);
    navigate('/', { replace: true });
  }

  function updateProfile(nextProfile) {
    setProfile((current) => ({ ...current, ...nextProfile }));
    setSession((current) => {
      if (!current) {
        return current;
      }

      const nextSession = { ...current, email: nextProfile.email };
      window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(nextSession));
      return nextSession;
    });
    showNotice('Profile updated.');
  }

  function changePassword() {
    showNotice('Password updated for this demo session.');
  }

  function deleteAccount() {
    window.localStorage.removeItem(STORAGE_KEYS.session);
    window.localStorage.removeItem(STORAGE_KEYS.expenses);
    window.localStorage.removeItem(STORAGE_KEYS.profile);
    setSession(null);
    setExpenses([]);
    navigate('/', { replace: true });
  }

  function addExpense(expense) {
    setExpenses((current) => [{ id: createExpenseId(), ...expense }, ...current]);
    setLastDeletedExpense(null);
    showNotice('Expense added.');
  }

  function updateExpense(expense) {
    setExpenses((current) =>
      current.map((item) => (item.id === expense.id ? { ...item, ...expense } : item))
    );
    setEditingExpense(null);
    setLastDeletedExpense(null);
    showNotice('Expense updated.');
  }

  function deleteExpense(id) {
    const expense = expenses.find((item) => item.id === id);
    if (!expense) {
      return;
    }

    const confirmed = window.confirm(`Delete "${expense.name}"? You can undo this for 5 seconds.`);
    if (!confirmed) {
      return;
    }

    setExpenses((current) => current.filter((item) => item.id !== id));
    setLastDeletedExpense(expense);
    showNotice('Expense deleted. Undo is available for 5 seconds.', 5000);

    window.clearTimeout(undoTimer.current);
    undoTimer.current = window.setTimeout(() => {
      setLastDeletedExpense(null);
      setNotice('');
    }, 5000);
  }

  function undoDelete(expense) {
    window.clearTimeout(undoTimer.current);
    setExpenses((current) => [expense, ...current]);
    setLastDeletedExpense(null);
    showNotice('Expense restored.');
  }

  function exportPdfReport() {
    const exported = exportExpensePdfReport({ categoryTotals, expenses, profile, total });
    showNotice(
      exported
        ? 'Tip: choose Save as PDF in the print dialog.'
        : 'Allow pop-ups for this site to export the PDF report.',
      6000
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPageRoute
            isSignedIn={Boolean(session)}
            theme={theme}
            onToggleTheme={toggleTheme}
            onNavigate={navigate}
          />
        }
      />
      <Route
        path="/login"
        element={
          session ? (
            <Navigate to="/app" replace />
          ) : (
            <LoginPage
              profile={profile}
              theme={theme}
              onToggleTheme={toggleTheme}
              onBackHome={() => navigate('/')}
              onSignIn={signIn}
            />
          )
        }
      />
      <Route
        path="/about"
        element={
          <AboutPage
            theme={theme}
            onToggleTheme={toggleTheme}
            onBackHome={() => navigate('/')}
          />
        }
      />
      <Route
        path="/app"
        element={
          session ? (
            <DashboardPage
              categoryTotals={categoryTotals}
              editingExpense={editingExpense}
              expenses={expenses}
              filteredExpenses={filteredExpenses}
              filters={filters}
              lastDeletedExpense={lastDeletedExpense}
              notice={notice}
              profile={profile}
              theme={theme}
              total={total}
              onAddExpense={addExpense}
              onCancelEdit={() => setEditingExpense(null)}
              onDeleteExpense={deleteExpense}
              onEditExpense={setEditingExpense}
              onExportPdf={exportPdfReport}
              onFilterChange={setFilters}
              onGoHome={() => navigate('/')}
              onOpenAnalytics={() => navigate('/analytics')}
              onOpenProfile={() => navigate('/profile')}
              onSignOut={signOut}
              onToggleTheme={toggleTheme}
              onUndoDelete={undoDelete}
              onUpdateExpense={updateExpense}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/profile"
        element={
          session ? (
            <ProfilePage
              expensesCount={expenses.length}
              profile={profile}
              theme={theme}
              total={total}
              onBackDashboard={() => navigate('/app')}
              onChangePassword={changePassword}
              onDeleteAccount={deleteAccount}
              onExportPdf={exportPdfReport}
              onOpenAnalytics={() => navigate('/analytics')}
              onSignOut={signOut}
              onToggleTheme={toggleTheme}
              onUpdateProfile={updateProfile}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/analytics"
        element={
          session ? (
            <AnalyticsPage
              expenses={expenses}
              categoryTotals={categoryTotals}
              theme={theme}
              onBackDashboard={() => navigate('/app')}
              onOpenProfile={() => navigate('/profile')}
              onToggleTheme={toggleTheme}
              onSignOut={signOut}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SpendNovaRoutes />
    </BrowserRouter>
  );
}

export default App;
