/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getTokenImageUrl = (symbol) => {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`;
};

const SwapForm = () => {
  const [tokens, setTokens] = useState([]);
  const [prices, setPrices] = useState({});
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://interview.switcheo.com/prices.json');
        setPrices(response.data);
        setTokens(Object.keys(response.data));
      } catch (error) {
        console.error('Error fetching token prices:', error);
      }
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    if (fromToken && toToken && amount) {
      const fromPrice = prices[fromToken]?.USD;
      const toPrice = prices[toToken]?.USD;
      if (fromPrice && toPrice) {
        const result = (amount * fromPrice) / toPrice;
        setConvertedAmount(result.toFixed(6));
      } else {
        setConvertedAmount('');
      }
    }
  }, [fromToken, toToken, amount, prices]);

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setConvertedAmount('');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Currency Swap</h1>

      <div className="space-y-2">
        <label className="block font-semibold">From:</label>
        <div className="flex items-center space-x-2">
          {fromToken && (
            <img 
              src={getTokenImageUrl(fromToken)} 
              alt={fromToken} 
              className="w-8 h-8"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <select 
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Token</option>
            {tokens.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-semibold">To:</label>
        <div className="flex items-center space-x-2">
          {toToken && (
            <img 
              src={getTokenImageUrl(toToken)} 
              alt={toToken} 
              className="w-8 h-8"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
          <select 
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Token</option>
            {tokens.map(token => (
              <option key={token} value={token}>{token}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-semibold">Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="w-full p-2 border rounded" 
        />
      </div>

      {convertedAmount && (
        <div className="text-center text-lg font-bold">
          = {convertedAmount} {toToken}
        </div>
      )}

      <button 
        onClick={handleSwap} 
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Swap
      </button>
    </div>
  );
};

export default SwapForm;
