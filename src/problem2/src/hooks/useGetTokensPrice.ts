import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "~/service/fetcher";

export type TokenPrice = {
  currency: string;
  date: string;
  price: number;
};

const useGetTokesPrice = () => {
  const { data, error, isLoading } = useSWR<TokenPrice[], Error>(
    "/api/data",
    fetcher
  );

  const tokens = useMemo(
    () => [...new Map(data?.map((item) => [item["currency"], item])).values()],
    [data]
  );

  return {
    tokens,
    error,
    isLoading,
  };
};

export default useGetTokesPrice;
