import { useForm } from 'react-hook-form';
import { formCurrencyResolver } from './zodResolver';
import { Field } from '~/components/Field';
import { SelectSingle } from '~/components/Select';
import imageArr from '~/data/data';
import { InputNumber } from '~/components/InputNumber';
import { Button } from '~/components/Button';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useMount } from '~/shared/useMount';
import { Typography } from 'antd';
import { Input } from '~/components/Input';
import { notification } from '~/components/Notification';

export interface FormValues {
  currencyFrom?: string;
  amount: number;
  currencyTo?: string;
}

const currencyOptions = imageArr.map((item) => ({
  label: (
    <div className='flex items-center space-x-2'>
      <img src={item.icon} alt={item.name} className='w-6 h-6 object-cover' />
      <span className='text-sm text-black'>{item.name}</span>
    </div>
  ),
  value: item.name,
  rawData: undefined,
}));

interface Pricing {
  currency: string;
  date: string;
  price: number;
}
export default function FormCurrency() {
  const [prices, setPrices] = useState<Pricing[]>([]);
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0);
  const {
    setValue,
    watch,
    formState: { errors },
    trigger,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: formCurrencyResolver(),
  });
  const formValues = watch();
  const onSubmit = (values: FormValues) => {
    setLoading(true);
    const currencyFromInfo = prices.find(
      (c) => c.currency === values.currencyFrom
    );

    const currencyToInfo = prices.find((c) => c.currency === values.currencyTo);
    setTimeout(() => {
      if (currencyFromInfo && currencyToInfo) {
        const ratio = currencyFromInfo.price / currencyToInfo.price;
        const result = values.amount * ratio;

        setExchangeRate(result);
        setLoading(false);
        notification.success({ message: 'Exchange rate successfully!' });
      } else {
        setExchangeRate(0);
        setLoading(false);
        notification.error({ message: 'Exchange rate not found!' });
      }
    }, 2000);
  };

  const getPriceFromJson = async () => {
    try {
      const response: AxiosResponse<Pricing[]> = await axios.get(
        'https://interview.switcheo.com/prices.json'
      );
      if (response) {
        setPrices(response.data);
      }
    } catch (err) {
      console.log(err);
      setPrices([]);
    }
  };

  useMount(() => {
    getPriceFromJson();
  });

  return (
    <div className='container mx-auto max-w-[768px] flex flex-col h-screen justify-center'>
      <div className='bg-white py-6 px-4 rounded-xl shadow-lg w-full border border-solid border-neutral-03'>
        <h1 className='text-[36px] font-semibold text-center'>Currency Swap</h1>
        <div className='flex flex-col gap-4'>
          <Field
            label='Currency From'
            withRequiredMark
            error={errors.currencyFrom?.message}
          >
            <SelectSingle
              options={currencyOptions}
              value={formValues.currencyFrom}
              onChange={(value) => {
                formValues.currencyTo !== value
                  ? setValue('currencyFrom', `${value}`)
                  : setValue('currencyTo', '');
                trigger('currencyFrom');
              }}
            />
          </Field>
          <Field label='Amount' withRequiredMark error={errors.amount?.message}>
            <InputNumber
              value={formValues.amount}
              onChange={(value) => {
                setValue('amount', value ? value : 0);
                trigger('amount');
              }}
            />
          </Field>
          <Field
            label='Currency To'
            withRequiredMark
            error={errors.currencyTo?.message}
          >
            <SelectSingle
              options={currencyOptions}
              value={formValues.currencyTo}
              onChange={(value) => {
                setValue('currencyTo', `${value}`);
                formValues.currencyFrom === value &&
                  setValue('currencyFrom', undefined);

                trigger('currencyTo');
              }}
            />
          </Field>
          <Button
            htmlType='submit'
            onClick={handleSubmit(onSubmit)}
            color='primary'
            loading={loading}
          >
            Transfer
          </Button>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
          <Typography.Text>Exchange rate: </Typography.Text>
          <Input
            value={exchangeRate.toString()}
            placeholder='outputCurrency'
            disabled
          />
        </div>
      </div>
    </div>
  );
}
