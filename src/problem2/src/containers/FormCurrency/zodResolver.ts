import { zodResolver } from '@hookform/resolvers/zod';
import { number, object, string } from 'zod';

export const formCurrencyResolver = () => {
  return zodResolver(
    object({
      currencyFrom: string({ required_error: 'Currency from is required' })
        .trim()
        .min(1, { message: 'Currency from is required' }),
      amount: number({ required_error: 'Amount is required' }),
      currencyTo: string({ required_error: 'Currency to is required' }),
    })
  );
};
