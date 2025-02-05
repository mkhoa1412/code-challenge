import useSWR from "swr";
import axiosInstance from "../axiosConfig/axios";
import { ICrypto } from "@modules/exchangeForm/types";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);
const useGetCryptoData = () => {
  const { data, error, isLoading } = useSWR<ICrypto[]>(
    "/crypto-data",
    () => fetcher("https://interview.switcheo.com/prices.json"),
    {
      refreshInterval: 5000,
    }
  );

  return {
    data: data,
    error,
    isLoading,
  };
};
export default useGetCryptoData;
