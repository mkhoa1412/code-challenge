import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Select, Space} from 'antd';

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

const CurrencySwapForm = () => {
    const [form] = Form.useForm();
    const [tokens, setTokens] = useState([]);
    const [prices, setPrices] = useState({});
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

    const onSwapping = (values) => {
        const {fromCurrency, toCurrency, amount} = values;
        if (!fromCurrency || !toCurrency || !amount) {
            setError('Please fill in all fields.');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        const rate = prices[fromCurrency] / prices[toCurrency];
        const resultAmount = amount * rate;

        setResult(`${amount} ${fromCurrency} = ${resultAmount.toFixed(4)} ${toCurrency}`);
        setError('');
    }
    const onReset = () => {
        form.resetFields();
        setError('');
        setResult('');
    };

    return (
        <div className="currency-swap-form-wrapper">
            <Card title="Currency Swapping">
                {error && <p className="error">{error}</p>}
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={onSwapping}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        name="fromCurrency"
                        label="From Currency"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="">Select Currency</Option>
                            {tokens.map((token) => (
                                <Option key={token} value={token}>
                                    {token}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="toCurrency"
                        label="To Currency"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="">Select Currency</Option>
                            {tokens.map((token) => (
                                <Option key={token} value={token}>
                                    {token}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        allowClear
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                {result && <p className="result">{`Result: ${result}`}</p>}
            </Card>
        </div>
    );
};

export default CurrencySwapForm;