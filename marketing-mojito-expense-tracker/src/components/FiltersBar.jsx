const categories = ['All', 'Food', 'Travel', 'Marketing', 'Utilities', 'Other'];

function FiltersBar({ filters, onChange }) {
  function updateFilter(event) {
    const { name, value } = event.target;
    onChange((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    onChange({
      search: '',
      category: 'All',
      sortBy: 'date-desc',
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: ''
    });
  }

  return (
    <section className="panel filters-panel" aria-label="Expense filters">
      <div className="panel-heading compact-heading">
        <div>
          <p className="eyebrow">Find expenses</p>
          <h2>Search and filters</h2>
        </div>
        <button className="ghost-action" type="button" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <div className="filter-grid">
        <label>
          <span>Search</span>
          <input
            name="search"
            value={filters.search}
            onChange={updateFilter}
            placeholder="Name"
          />
        </label>

        <label>
          <span>Category</span>
          <select name="category" value={filters.category} onChange={updateFilter}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Sort by</span>
          <select name="sortBy" value={filters.sortBy} onChange={updateFilter}>
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Highest amount</option>
            <option value="amount-asc">Lowest amount</option>
            <option value="category">Category</option>
          </select>
        </label>

        <label>
          <span>From</span>
          <input name="startDate" type="date" value={filters.startDate} onChange={updateFilter} />
        </label>

        <label>
          <span>To</span>
          <input name="endDate" type="date" value={filters.endDate} onChange={updateFilter} />
        </label>

        <label>
          <span>Min</span>
          <input
            name="minAmount"
            type="number"
            min="0"
            step="0.01"
            value={filters.minAmount}
            onChange={updateFilter}
            placeholder="0"
          />
        </label>

        <label>
          <span>Max</span>
          <input
            name="maxAmount"
            type="number"
            min="0"
            step="0.01"
            value={filters.maxAmount}
            onChange={updateFilter}
            placeholder="Any"
          />
        </label>
      </div>
    </section>
  );
}

export default FiltersBar;
