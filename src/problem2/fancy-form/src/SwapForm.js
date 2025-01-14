import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, Space } from 'antd';
import './SwapForm.css';


const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    }
}

const SwapForm = () => {
    const [form] = Form.useForm();
    const [tokens, setTokens] = useState([]);
    const [prices, setPrices] = useState({});
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get('https://interview.switcheo.com/prices.json');
                setTokens(Object.keys(response.data));
                setPrices(response.data);
            } catch (error) {
                console.error('Error fetching token data:', error);
            }
        };
        fetchTokens();
    }, []);

    const onFromCurrencyChanged= (value) => {
        setFromCurrency(value);
    };

    const handleSwapping = (values) => {

    }

    const handleSwap = () => {
        if (!fromCurrency || !toCurrency || !amount) {
            setError('Please fill in all fields.');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        if (!prices[fromCurrency] || !prices[toCurrency]) {
            setError('Selected currencies do not have a price.');
            return;
        }

        const rate = prices[fromCurrency] / prices[toCurrency];
        const resultAmount = amount * rate;

        setResult(`${amount} ${fromCurrency} = ${resultAmount.toFixed(4)} ${toCurrency}`);
        setError('');
    };

    return (
        <div className="swap-form">
            <h1>Currency Swap</h1>
            <div className="form-group">
                <label>From:</label>
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    <option value="">Select Currency</option>
                    {tokens.map((token) => (
                        <option key={token} value={token}>
                            {token}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>To:</label>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    <option value="">Select Currency</option>
                    {tokens.map((token) => (
                        <option key={token} value={token}>
                            {token}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Amount:</label>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button onClick={handleSwap}>Swap</button>
            {result && <p className="result">{result}</p>}
        </div>
    );
};

export default SwapForm;