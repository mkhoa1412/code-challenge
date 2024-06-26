// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from 'react';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD');
  const [result, setResult] = useState('');

  useEffect(
    function () {
      async function convert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setResult(data.rates[toCur]);
      }
      if (fromCur === toCur) return setResult(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div className="container">
      <h1 className="text-2xl font-bold text-center">Currency Converter</h1>

      <div className="flex items-center justify-between">
        <div className="flex flex-col mt-4">
          <label className="text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-2 w-50"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-gray-700 mb-2">From</label>
          <select
            value={fromCur}
            onChange={(e) => setFromCur(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-2 w-57"
          >
            <option value="USD">US dollar</option>
            <option value="JPY">Japanese yen</option>
            <option value="BGN">Bulgarian lev</option>
            <option value="CZK">Czech koruna</option>
            <option value="DKK">Danish krone</option>
            <option value="GBP">Pound sterling</option>
            <option value="HUF">Hungarian forint</option>
            <option value="PLN">Polish zloty</option>
            <option value="RON">Romanian leu</option>
            <option value="SEK">Swedish krona</option>
            <option value="CHF">CHF</option>
            <option value="ISK">Icelandic krona</option>
            <option value="NOK">Norwegian krone</option>
            <option value="TRY">Turkish lira</option>
            <option value="AUD">Australian dollar</option>
            <option value="BRL">Brazilian real</option>
            <option value="CNY">Chinese yuan renminbi</option>
            <option value="HKD">Hong Kong dollar</option>
            <option value="IDR">Indonesian rupiah</option>
            <option value="ILS">Israeli shekel</option>
            <option value="ZAR">South African rand</option>
            <option value="KRW">South Korean won</option>
            <option value="MXN">Mexican peso</option>
            <option value="MYR">Malaysian ringgit</option>
            <option value="NZD">New Zealand dollar</option>
            <option value="PHP">Philippine peso</option>
            <option value="SGD">Singapore dollar</option>
            <option value="THB">Thai baht</option>
            <option value="EUR">Euro</option>
            <option value="CAD">Canadian dollar</option>
            <option value="INR">Indian rupee</option>
          </select>
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-gray-700 mb-2">To</label>
          <select
            value={toCur}
            onChange={(e) => setToCur(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-2 w-57"
          >
            <option value="USD">US dollar</option>
            <option value="JPY">Japanese yen</option>
            <option value="BGN">Bulgarian lev</option>
            <option value="CZK">Czech koruna</option>
            <option value="DKK">Danish krone</option>
            <option value="GBP">Pound sterling</option>
            <option value="HUF">Hungarian forint</option>
            <option value="PLN">Polish zloty</option>
            <option value="RON">Romanian leu</option>
            <option value="SEK">Swedish krona</option>
            <option value="CHF">CHF</option>
            <option value="ISK">Icelandic krona</option>
            <option value="NOK">Norwegian krone</option>
            <option value="TRY">Turkish lira</option>
            <option value="AUD">Australian dollar</option>
            <option value="BRL">Brazilian real</option>
            <option value="CNY">Chinese yuan renminbi</option>
            <option value="HKD">Hong Kong dollar</option>
            <option value="IDR">Indonesian rupiah</option>
            <option value="ILS">Israeli shekel</option>
            <option value="ZAR">South African rand</option>
            <option value="KRW">South Korean won</option>
            <option value="MXN">Mexican peso</option>
            <option value="MYR">Malaysian ringgit</option>
            <option value="NZD">New Zealand dollar</option>
            <option value="PHP">Philippine peso</option>
            <option value="SGD">Singapore dollar</option>
            <option value="THB">Thai baht</option>
            <option value="EUR">Euro</option>
            <option value="CAD">Canadian dollar</option>
            <option value="INR">Indian rupee</option>
          </select>
        </div>
      </div>
      <p className="mt-5 text-xl">
        {amount} {fromCur} = {result} {toCur}
      </p>
    </div>
  );
}
