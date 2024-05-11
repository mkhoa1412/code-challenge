import { number, object } from 'yup';

export const exchangeCurrencySchema = () =>
  object().shape({
    inputPrice: number().required('This field is required'),

    outputPrice: number().required('This field is required'),

    inputAmount: number()
      .min(1, 'Amount must be larger than 1')
      .max(999999999999999, 'Amount must be lower than 999999999999999')
      .required('Amount is required')
      .positive('Amount must be positive')
      .typeError('Please enter a valid amount'),

    outputAmount: number().default(0),
  });
