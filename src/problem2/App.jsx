import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [prices, setPrices] = useState({});
  const [form, setForm] = useState({
    fromCurrency: "",
    toCurrency: "",
    amount: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(null); // For dropdown control
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://interview.switcheo.com/prices.json"
        );
        const pricesData = response.data;

        setPrices(pricesData);

        const uniqueCurrencies = [...new Set(pricesData.map((item) => item.currency))];
        setCurrencies(
          uniqueCurrencies.map((currency) => ({
            value: currency,
            label: currency,
            icon: `/tokens-icon/${currency.toLowerCase()}.svg`, // Example icon path
          }))
        );
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  const handleSwap = (e) => {
    e.preventDefault();
    setError("");

    const { fromCurrency, toCurrency, amount } = form;

    if (!fromCurrency || !toCurrency || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    if (fromCurrency === toCurrency) {
      setError("From and To currencies must be different.");
      return;
    }

    const fromPrice = prices.find((p) => p.currency === fromCurrency)?.price || 0;
    const toPrice = prices.find((p) => p.currency === toCurrency)?.price || 0;

    if (fromPrice === 0 || toPrice === 0) {
      setError("Invalid exchange rates.");
      return;
    }

    const convertedAmount = (amount * fromPrice) / toPrice;
    alert(`You will receive ${convertedAmount.toFixed(2)} ${toCurrency}.`);
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setDropdownOpen(null);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSwap} className="currency-form">
        <h1>Currency Swap</h1>

        {error && <div role="alert" className="error-alert">{error}</div>}

        {/* From Currency */}
        <div className="form-group custom-dropdown">
          <label>From Currency</label>
          <div
            className="dropdown"
            onClick={() =>
              setDropdownOpen(dropdownOpen === "fromCurrency" ? null : "fromCurrency")
            }
          >
            <div className="selected-option">
              {form.fromCurrency ? (
                <>
                  <img
                    src={currencies.find((c) => c.value === form.fromCurrency)?.icon}
                    alt={form.fromCurrency}
                    className="option-icon"
                  />
                  {form.fromCurrency}
                </>
              ) : (
                "Select a currency"
              )}
            </div>
            {dropdownOpen === "fromCurrency" && (
              <ul className="dropdown-menu">
                {currencies.map((currency) => (
                  <li
                    key={currency.value}
                    className="dropdown-item"
                    onClick={() => handleChange("fromCurrency", currency.value)}
                  >
                    <img src={currency.icon} alt={currency.label} className="option-icon" />
                    {currency.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* To Currency */}
        <div className="form-group custom-dropdown">
          <label>To Currency</label>
          <div
            className="dropdown"
            onClick={() =>
              setDropdownOpen(dropdownOpen === "toCurrency" ? null : "toCurrency")
            }
          >
            <div className="selected-option">
              {form.toCurrency ? (
                <>
                  <img
                    src={currencies.find((c) => c.value === form.toCurrency)?.icon}
                    alt={form.toCurrency}
                    className="option-icon"
                  />
                  {form.toCurrency}
                </>
              ) : (
                "Select a currency"
              )}
            </div>
            {dropdownOpen === "toCurrency" && (
              <ul className="dropdown-menu">
                {currencies.map((currency) => (
                  <li
                    key={currency.value}
                    className="dropdown-item"
                    onClick={() => handleChange("toCurrency", currency.value)}
                  >
                    <img src={currency.icon} alt={currency.label} className="option-icon" />
                    {currency.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="input-field"
            placeholder="Enter amount"
          />
        </div>

        <button type="submit" className="submit-button">
          Swap
        </button>
      </form>
    </div>
  );
};

export default App;
