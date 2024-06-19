import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select, { components } from 'react-select';
import './CurrencySwapForm.css';

const schema = yup.object().shape({
  fromCurrency: yup.string().required('From currency is required'),
  toCurrency: yup.string().required('To currency is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
});

const Option = (props) => {
  const {
    data: { label },
  } = props;
  return (
    <components.Option {...props}>
      <img src={`assets/icon/${label}.svg`} alt='' />
      {label}
    </components.Option>
  );
};

const CurrencySwapForm = () => {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [swappedAmount, setSwappedAmount] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Fetch token data and prices
    const fetchData = async () => {
      const pricesRes = await axios.get(
        'https://interview.switcheo.com/prices.json'
      );
      setExchangeRates(pricesRes.data);

      setCurrencies(pricesRes.data);
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    console.log('Swapping currencies:', data);
    const { fromCurrency, toCurrency } = data;
    const fromRate = fromCurrency;
    const toRate = toCurrency;
    let { price: priceFromCurrency } = currencies.find(
      (currency) => currency.currency === fromCurrency
    );
    let { price: priceToCurrency } = currencies.find(
      (currency) => currency.currency === toRate
    );
    if (fromRate && toRate) {
      const result = (data.amount * priceFromCurrency) / priceToCurrency;
      setSwappedAmount(result);
    } else {
      setSwappedAmount('Invalid currency selection');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='currency-swap-form'>
      <div className='form-group'>
        <label>From Currency</label>
        <Select
          options={currencies.map((currency) => ({
            label: currency.currency,
            value: currency.price,
          }))}
          components={{ Option }}
        />
        {errors.fromCurrency && (
          <p className='error-message'>{errors.fromCurrency.message}</p>
        )}
      </div>
      <div className='form-group'>
        <label>To Currency</label>
        <Select
          options={currencies.map((currency) => ({
            label: currency.currency,
            value: currency.price,
          }))}
          components={{ Option }}
        />
        {errors.toCurrency && (
          <p className='error-message'>{errors.toCurrency.message}</p>
        )}
      </div>
      <div className='form-group'>
        <label>Amount</label>
        <Controller
          name='amount'
          control={control}
          render={({ field }) => <input type='number' {...field} />}
        />
        {errors.amount && (
          <p className='error-message'>{errors.amount.message}</p>
        )}
      </div>
      <button type='submit' className='submit-button'>
        Swap
      </button>
      {swappedAmount && (
        <div className='result'>
          <h3>Swapped Amount: {swappedAmount}</h3>
        </div>
      )}
    </form>
  );
};

export default CurrencySwapForm;
