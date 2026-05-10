import React from 'react';

export default function AnalyticsInsights({ expenses }) {
  const stats = React.useMemo(() => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const count = expenses.length;
    const average = count > 0 ? total / count : 0;
    const max = count > 0 ? Math.max(...expenses.map(e => e.amount)) : 0;
    return { total, count, average, max };
  }, [expenses]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  return (
    <div className="panel flex flex-col min-h-[400px]">
      <div className="panel-heading">
        <h2>Key Insights</h2>
      </div>
      <div className="grid gap-3 flex-1">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950 flex flex-col justify-center">
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Total Spent</span>
          <strong className="mt-1 block text-2xl font-black text-teal-700 dark:text-teal-400">{formatCurrency(stats.total)}</strong>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950 flex flex-col justify-center">
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Highest Expense</span>
          <strong className="mt-1 block text-2xl font-black text-rose-600 dark:text-rose-400">{formatCurrency(stats.max)}</strong>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950 flex flex-col justify-center">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Transactions</span>
            <strong className="mt-1 block text-xl font-black text-slate-900 dark:text-white">{stats.count}</strong>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950 flex flex-col justify-center">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Average</span>
            <strong className="mt-1 block text-xl font-black text-slate-900 dark:text-white">{formatCurrency(stats.average)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
