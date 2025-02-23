import { useEffect, useState } from "react";
import { WalletBalance } from "../interfaces/balances.interface";

// Hook to fetch wallet balances
export const useWalletBalances = () => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetch("/api/wallet-balances"); // Replace with actual API endpoint

        const data = await response.json();

        setBalances(data);
      } catch (error) {
        console.error("Error fetching wallet balances:", error);
      }
    };

    fetchBalances();
  }, []);

  return balances;
};
