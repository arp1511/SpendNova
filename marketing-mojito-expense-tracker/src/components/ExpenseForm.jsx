import { useEffect, useState } from 'react';

const categories = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];
const today = new Date().toISOString().slice(0, 10);

const emptyForm = {
  name: '',
  amount: '',
  category: 'Food',
  date: today,
  notes: ''
};

function ExpenseForm({ editingExpense, onAddExpense, onUpdateExpense, onCancelEdit }) {
  const [form, setForm] = useState({
    ...emptyForm
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setForm({
        name: editingExpense.name,
        amount: String(editingExpense.amount),
        category: editingExpense.category,
        date: editingExpense.date,
        notes: editingExpense.notes || ''
      });
      setError('');
    }
  }, [editingExpense]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = form.name.trim();
    const parsedAmount = Number(form.amount);
    const notes = form.notes.trim();

    if (!trimmedName) {
      setError('Enter an expense name.');
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError('Enter an amount greater than zero.');
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(form.amount)) {
      setError('Use no more than 2 decimal places.');
      return;
    }

    if (!form.date) {
      setError('Choose an expense date.');
      return;
    }

    const payload = {
      name: trimmedName,
      amount: Math.round(parsedAmount * 100) / 100,
      category: form.category,
      date: form.date,
      notes
    };

    if (editingExpense) {
      onUpdateExpense({ id: editingExpense.id, ...payload });
    } else {
      onAddExpense(payload);
    }

    setForm({ ...emptyForm, category: form.category });
  }

  return (
    <form className="panel expense-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <p className="eyebrow">New entry</p>
        <h2>{editingExpense ? 'Edit expense' : 'Add expense'}</h2>
      </div>

      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={updateField}
          placeholder="e.g. Airport cab"
          maxLength="100"
        />
      </label>

      <label>
        <span>Amount (INR)</span>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={updateField}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </label>

      <label>
        <span>Category</span>
        <select name="category" value={form.category} onChange={updateField}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Date</span>
        <input type="date" name="date" value={form.date} onChange={updateField} />
      </label>

      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          value={form.notes}
          onChange={updateField}
          placeholder="Optional context"
          maxLength="500"
        />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-actions">
        <button className="primary-action" type="submit">
          {editingExpense ? 'Save Changes' : 'Add Expense'}
        </button>
        {editingExpense ? (
          <button className="ghost-action" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default ExpenseForm;
