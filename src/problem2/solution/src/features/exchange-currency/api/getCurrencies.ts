import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Currency } from '../types';

export const getCurrencies = (): Promise<Currency[]> => {
  return axios.get('prices.json');
};

type QueryFnType = typeof getCurrencies;

type UseCurrenciesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCurrencies = ({ config }: UseCurrenciesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['currency'],
    queryFn: () => getCurrencies(),
    ...config,
  });
};
