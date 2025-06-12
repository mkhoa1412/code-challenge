import { getCurrencyPrice } from "@/api/currency";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrencyQuery = () => {
  return useQuery({
    queryKey: ["currency"],
    queryFn: async () => await getCurrencyPrice(),
  });
};
