import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsBarChart({ expenses }) {
  const barData = React.useMemo(() => {
    const dateMap = {};
    expenses.forEach(exp => {
      if (!dateMap[exp.date]) dateMap[exp.date] = 0;
      dateMap[exp.date] += exp.amount;
    });
    return Object.keys(dateMap).sort().map(date => ({
      date,
      amount: dateMap[date]
    }));
  }, [expenses]);

  return (
    <div className="panel flex flex-col min-h-[400px]">
      <div className="panel-heading">
        <h2>Spending Over Time</h2>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
              formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
              cursor={{fill: 'rgba(15, 118, 110, 0.05)'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="amount" fill="#0f766e" name="Amount" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
