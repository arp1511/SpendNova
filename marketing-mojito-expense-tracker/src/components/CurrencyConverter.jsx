import { useEffect, useState } from 'react';

const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD', 'SGD', 'AED', 'CHF'];
const fallbackRates = {
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  INR: 1,
  JPY: 1.8,
  CAD: 0.016,
  AUD: 0.018,
  SGD: 0.016,
  AED: 0.044,
  CHF: 0.011
};
const RATE_CACHE_KEY = 'spendnova-last-live-rates';

function readCachedRates() {
  try {
    return JSON.parse(window.localStorage.getItem(RATE_CACHE_KEY)) || null;
  } catch {
    return null;
  }
}

function CurrencyConverter({ amount, baseCurrency }) {
  const [currency, setCurrency] = useState('USD');
  const [rates, setRates] = useState(fallbackRates);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [source, setSource] = useState('');

  async function fetchRates(signal) {
    const controller = new AbortController();
    const requestSignal = signal || controller.signal;
    const cached = readCachedRates();
    const targetCurrencies = currencies.filter((item) => item !== baseCurrency).join(',');

    setStatus('loading');
    setError('');

    try {
      const primaryResponse = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`, {
        signal: requestSignal
      });

      if (primaryResponse.ok) {
        const primaryData = await primaryResponse.json();
        if (primaryData.result === 'success' && primaryData.rates) {
          const nextRates = currencies.reduce(
            (collection, item) => ({ ...collection, [item]: primaryData.rates[item] || fallbackRates[item] }),
            { [baseCurrency]: 1 }
          );
          const updatedAt = primaryData.time_last_update_utc || new Date().toISOString();

          setRates(nextRates);
          setStatus('success');
          setSource('open.er-api.com');
          setLastUpdated(updatedAt);
          window.localStorage.setItem(
            RATE_CACHE_KEY,
            JSON.stringify({ baseCurrency, rates: nextRates, timestamp: Date.now(), updatedAt })
          );
          return;
        }
      }

      const frankfurterResponse = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${targetCurrencies}`,
        { signal: requestSignal }
      );

      if (!frankfurterResponse.ok) {
        throw new Error('Unable to fetch exchange rates.');
      }

      const data = await frankfurterResponse.json();
      const nextRates = { [baseCurrency]: 1, ...(data.rates || {}) };
      const updatedAt = data.date || new Date().toISOString().slice(0, 10);

      setRates(nextRates);
      setStatus('success');
      setSource('Frankfurter API');
      setLastUpdated(updatedAt);
      window.localStorage.setItem(
        RATE_CACHE_KEY,
        JSON.stringify({ baseCurrency, rates: nextRates, timestamp: Date.now(), updatedAt })
      );
    } catch (apiError) {
      if (apiError.name === 'AbortError') {
        return;
      }

      if (cached && cached.baseCurrency === baseCurrency) {
        setRates(cached.rates);
        setLastUpdated(cached.updatedAt);
        setSource('last known live rate');
      } else {
        setRates(fallbackRates);
        setSource('estimated offline backup');
      }

      setStatus('error');
      setError('Live API is unreachable right now. Showing the safest available backup and retrying automatically.');
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchRates(controller.signal);
    const timer = window.setInterval(() => fetchRates(), 60000);

    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, [baseCurrency]);

  const rate = rates[currency] || fallbackRates[currency] || 1;
  const convertedAmount = amount * rate;

  return (
    <section className="panel converter-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Live preview</p>
          <h2>Currency converter</h2>
        </div>
        <button className="ghost-action" type="button" onClick={() => fetchRates()}>
          Refresh live
        </button>
      </div>

      <label>
        <span>Convert total to</span>
        <select value={currency} onChange={(event) => setCurrency(event.target.value)}>
          {currencies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <div className="converted-total">
        <span>{status === 'loading' ? 'Calling live rate API...' : `Total in ${currency}`}</span>
        <strong>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency
          }).format(convertedAmount)}
        </strong>
      </div>

      {error ? <p className="api-error soft-error">{error}</p> : null}
    </section>
  );
}

export default CurrencyConverter;
