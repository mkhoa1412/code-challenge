/* eslint-disable @typescript-eslint/no-var-requires */
import { yupResolver } from '@hookform/resolvers/yup';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { CircularProgress, Grid, IconButton } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { Autocomplete, TextField } from '@/components/Input';
import { option } from '@/constant/global';

import { useCurrencies } from '../api/getCurrencies';
import { exchangeCurrencySchema } from '../schema';
import { calculateOutputAmount } from '../utils';

type ExchangeFormData = {
  inputAmount: number;
  inputPrice: number;
  outputAmount: number;
  outputPrice: number;
};

export function ExchangeForm() {
  const methods = useForm({
    resolver: yupResolver(exchangeCurrencySchema()),
    defaultValues: {
      inputAmount: 0,
      inputPrice: undefined,
      outputAmount: 0,
      outputPrice: undefined,
    },
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = (data: ExchangeFormData) => {
    const { inputPrice, outputPrice, inputAmount } = data;

    const outputAmount = calculateOutputAmount(inputAmount, inputPrice, outputPrice);
    setValue('outputAmount', parseFloat(outputAmount.toFixed(3)));
  };

  const currenciesQuery = useCurrencies();

  const options: option[] | undefined = currenciesQuery?.data?.map((item, index) => ({
    id: index,
    value: item.price,
    label: item.currency,
  }));

  return (
    <FormProvider {...methods}>
      <Grid container className="ExchangeForm" alignItems="end">
        <Grid item xs={12} textAlign="center">
          <img src={require('@/assets/img/token.svg').default} alt="mySvgImage" width="5%" />
        </Grid>
        <Grid container item xs={12} md={5} alignItems="baseline" columnSpacing={1}>
          <Grid item xs={5}>
            {currenciesQuery.isLoading ? (
              <CircularProgress />
            ) : (
              <Autocomplete name="inputPrice" label="Currency" options={options} required />
            )}
          </Grid>
          <Grid item xs={7}>
            <TextField fullWidth name="inputAmount" label="Amount to send" />
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} textAlign="center">
          <IconButton onClick={handleSubmit(onSubmit)}>
            <SwapHorizIcon />
          </IconButton>
        </Grid>
        <Grid container item xs={12} md={5} alignItems="baseline" columnSpacing={1}>
          <Grid item xs={5}>
            {currenciesQuery.isLoading ? (
              <CircularProgress />
            ) : (
              <Autocomplete name="outputPrice" label="Currency" options={options} required />
            )}
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              name="outputAmount"
              label="Amount to receive"
              sx={{ pointerEvents: 'none' }}
            />
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
